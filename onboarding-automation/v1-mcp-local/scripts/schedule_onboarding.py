#!/usr/bin/env python3
"""
schedule_onboarding.py
-----------------------
Monitors new_employees.csv for rows with status=pending, sends each one the
Apollo onboarding email via send_onboarding_email.py, then marks the row as
sent/failed and appends an entry to sent_log.csv.

Two ways to run it:

1) Via a real cron job (recommended for servers) — cron handles the timing,
   this script just does a single pass and exits:

       0 9 * * 1 cd /path/to/onboarding && \
         /usr/bin/python3 schedule_onboarding.py --once >> scheduler_cron.log 2>&1

   (crontab -e, paste the line above, adjust paths.)

2) As a standalone long-running process (e.g. in a container with no cron),
   using the built-in weekly loop:

       python3 schedule_onboarding.py
       # checks every minute, fires the batch every Monday at 09:00

CSV format (new_employees.csv):
    name,role,department,start_date,manager,email,status
    Maria Schmidt,Junior Energy Consultant,Engineering,2026-07-21,Alexandra Xanthopoulos,maria.schmidt@apollo-gs.com,pending

IMPORTANT: this script will actually send real emails to real people once
SMTP_HOST / SMTP_USER / SMTP_PASSWORD are configured and --dry-run is not
passed. Test with --dry-run against a copy of the CSV first, and review
sent_log.csv regularly — this runs unattended.
"""

import argparse
import csv
import logging
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
DEFAULT_CSV = PROJECT_DIR / "new_employees.csv"
DEFAULT_SENT_LOG = PROJECT_DIR / "sent_log.csv"
DEFAULT_SEND_SCRIPT = SCRIPT_DIR / "send_onboarding_email.py"
LOG_PATH = PROJECT_DIR / "scheduler.log"

FIELDNAMES = ["name", "role", "department", "start_date", "manager", "email", "status"]
SENT_LOG_FIELDNAMES = ["timestamp", "name", "email", "result", "detail"]

logger = logging.getLogger("scheduler")


def setup_logging(verbose: bool = False) -> None:
    level = logging.DEBUG if verbose else logging.INFO
    logger.setLevel(level)
    logger.handlers.clear()
    fmt = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s", "%Y-%m-%d %H:%M:%S")
    console = logging.StreamHandler(sys.stdout)
    console.setFormatter(fmt)
    logger.addHandler(console)
    file_handler = logging.FileHandler(LOG_PATH, encoding="utf-8")
    file_handler.setFormatter(fmt)
    logger.addHandler(file_handler)


def read_employees(csv_path: Path):
    if not csv_path.exists():
        logger.warning("CSV not found at %s — nothing to process.", csv_path)
        return []
    with csv_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return list(reader)


def write_employees(csv_path: Path, rows) -> None:
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerows(rows)


def append_sent_log(log_path: Path, name: str, email: str, result: str, detail: str) -> None:
    is_new = not log_path.exists()
    with log_path.open("a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=SENT_LOG_FIELDNAMES)
        if is_new:
            writer.writeheader()
        writer.writerow({
            "timestamp": datetime.now().isoformat(timespec="seconds"),
            "name": name,
            "email": email,
            "result": result,
            "detail": detail,
        })


def process_pending(csv_path: Path, sent_log_path: Path, send_script: Path,
                     dry_run: bool, provider: str) -> int:
    rows = read_employees(csv_path)
    if not rows:
        return 0

    pending = [r for r in rows if r.get("status", "").strip().lower() == "pending"]
    if not pending:
        logger.info("No pending rows in %s.", csv_path)
        return 0

    logger.info("Found %d pending row(s) to process.", len(pending))
    sent_count = 0

    for row in rows:
        if row.get("status", "").strip().lower() != "pending":
            continue

        name, role, department = row["name"], row["role"], row["department"]
        start_date, manager, email = row["start_date"], row["manager"], row["email"]

        cmd = [
            sys.executable, str(send_script),
            "--name", name,
            "--role", role,
            "--department", department,
            "--start-date", start_date,
            "--manager", manager,
            "--to-email", email,
        ]
        if provider:
            cmd += ["--provider", provider]
        if dry_run:
            cmd += ["--dry-run"]

        logger.info("Processing %s <%s>%s", name, email, " [dry-run]" if dry_run else "")
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        except Exception as e:  # noqa: BLE001
            logger.exception("Failed to launch send_onboarding_email.py for %s: %s", name, e)
            row["status"] = "failed"
            append_sent_log(sent_log_path, name, email, "failed", str(e))
            continue

        if result.returncode == 0:
            row["status"] = "dry-run-ok" if dry_run else "sent"
            append_sent_log(sent_log_path, name, email,
                             "dry-run-ok" if dry_run else "sent",
                             "OK")
            sent_count += 1
            logger.info("Success for %s.", name)
        else:
            row["status"] = "failed"
            detail = (result.stderr or result.stdout or "unknown error").strip().splitlines()[-1]
            append_sent_log(sent_log_path, name, email, "failed", detail)
            logger.error("send_onboarding_email.py failed for %s: %s", name, detail)

    write_employees(csv_path, rows)
    logger.info("Batch complete. %d email(s) processed successfully.", sent_count)
    return sent_count


def run_scheduler_loop(csv_path: Path, sent_log_path: Path, send_script: Path,
                       dry_run: bool, provider: str, check_interval: int) -> None:
    logger.info("Starting scheduler loop — checking every %ss, firing Mondays at 09:00.",
                check_interval)
    last_run_date = None
    while True:
        now = datetime.now()
        if now.weekday() == 0 and now.hour == 9 and now.minute == 0 and last_run_date != now.date():
            logger.info("Weekly trigger reached (Monday 09:00) — running batch.")
            process_pending(csv_path, sent_log_path, send_script, dry_run, provider)
            last_run_date = now.date()
        time.sleep(check_interval)


def parse_args(argv=None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Monitor new_employees.csv and send pending onboarding emails.")
    parser.add_argument("--csv", default=str(DEFAULT_CSV), help="Path to new_employees.csv")
    parser.add_argument("--sent-log", dest="sent_log", default=str(DEFAULT_SENT_LOG), help="Path to sent_log.csv")
    parser.add_argument("--send-script", dest="send_script", default=str(DEFAULT_SEND_SCRIPT),
                         help="Path to send_onboarding_email.py")
    parser.add_argument("--provider", choices=["gmail", "o365"], default=None,
                         help="Passed through to send_onboarding_email.py")
    parser.add_argument("--dry-run", action="store_true", help="Passed through — preview without sending")
    parser.add_argument("--once", action="store_true",
                         help="Run a single pass and exit (use this from cron)")
    parser.add_argument("--check-interval", type=int, default=60,
                         help="Seconds between checks in loop mode (default: 60)")
    parser.add_argument("--verbose", action="store_true")
    return parser.parse_args(argv)


def main(argv=None) -> int:
    args = parse_args(argv)
    setup_logging(args.verbose)

    csv_path = Path(args.csv)
    sent_log_path = Path(args.sent_log)
    send_script = Path(args.send_script)

    if not send_script.exists():
        logger.error("send_onboarding_email.py not found at %s", send_script)
        return 1

    if args.once:
        process_pending(csv_path, sent_log_path, send_script, args.dry_run, args.provider)
        return 0

    try:
        run_scheduler_loop(csv_path, sent_log_path, send_script, args.dry_run,
                           args.provider, args.check_interval)
    except KeyboardInterrupt:
        logger.info("Scheduler stopped by user.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
