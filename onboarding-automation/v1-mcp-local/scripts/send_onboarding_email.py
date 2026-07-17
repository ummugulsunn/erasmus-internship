#!/usr/bin/env python3
"""
send_onboarding_email.py
-------------------------
Sends the Apollo Green Solutions onboarding email to a new employee by
filling in onboarding_template.html and delivering it over SMTP.

Supports Gmail / Google Workspace and Microsoft 365 / Outlook SMTP relays.
Credentials are read from environment variables — never hardcode them here.

Required environment variables (unless --dry-run):
    SMTP_HOST      e.g. smtp.gmail.com  or  smtp.office365.com
    SMTP_PORT      e.g. 587
    SMTP_USER      the mailbox that sends the email (e.g. hr@apollo-gs.com)
    SMTP_PASSWORD  an app password (Gmail) or mailbox password / app password (M365)

Gmail note: if the sending account has 2FA enabled (recommended), you must
generate an "App Password" in the Google Account security settings — the
normal account password will not work over SMTP.

Microsoft 365 note: SMTP AUTH must be enabled for the mailbox by the tenant
admin (it is disabled by default on many tenants). If your org has disabled
basic SMTP AUTH, use the Graph API / an approved connector instead.

Example usage:
    python send_onboarding_email.py \\
        --name "Maria Schmidt" \\
        --role "Junior Energy Consultant" \\
        --department "Engineering" \\
        --start-date "July 21, 2026" \\
        --manager "Alexandra Xanthopoulos" \\
        --to-email "maria.schmidt@apollo-gs.com" \\
        --dry-run
"""

import argparse
import logging
import os
import smtplib
import sys
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
TEMPLATE_PATH = SCRIPT_DIR.parent / "templates" / "onboarding_email_template.html"
LOG_PATH = SCRIPT_DIR.parent / "onboarding_email.log"

PROVIDER_DEFAULTS = {
    "gmail": {"host": "smtp.gmail.com", "port": 587},
    "o365": {"host": "smtp.office365.com", "port": 587},
}

DATE_FORMATS = [
    "%B %d, %Y",   # July 21, 2026
    "%b %d, %Y",   # Jul 21, 2026
    "%Y-%m-%d",    # 2026-07-21
    "%m/%d/%Y",    # 07/21/2026
    "%d/%m/%Y",    # 21/07/2026
]

logger = logging.getLogger("onboarding_email")


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


def parse_start_date(raw: str) -> datetime:
    """Best-effort parse of the --start-date string into a datetime."""
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(raw.strip(), fmt)
        except ValueError:
            continue
    logger.warning("Could not parse start date '%s' — day-by-day dates in the "
                    "schedule table will be left blank.", raw)
    return None


def business_days(start: datetime, count: int):
    """Return `count` consecutive calendar days starting at `start`
    (kept simple: Day 1-5 are just start_date + 0..4 days, matching the
    Mon-Fri onboarding week as long as start_date falls on a Monday)."""
    return [start + timedelta(days=i) for i in range(count)]


def derive_manager_email(manager_name: str) -> str:
    """Fallback heuristic: 'Alexandra Xanthopoulos' -> alexandra.xanthopoulos@apollo-gs.com
    Override with --manager-email whenever the real address differs from this pattern."""
    parts = [p.lower() for p in manager_name.strip().split() if p.isalpha()]
    if not parts:
        return "manager@apollo-gs.com"
    return f"{'.'.join(parts)}@apollo-gs.com"


def render_template(args, template_text: str) -> str:
    start_dt = parse_start_date(args.start_date)
    day_labels = {}
    if start_dt:
        for i, d in enumerate(business_days(start_dt, 5), start=1):
            day_labels[f"DAY{i}_DATE"] = d.strftime("%b %d")
    else:
        for i in range(1, 6):
            day_labels[f"DAY{i}_DATE"] = ""

    manager_email = args.manager_email or derive_manager_email(args.manager)

    replacements = {
        "{{NAME}}": args.name,
        "{{ROLE}}": args.role,
        "{{DEPARTMENT}}": args.department,
        "{{START_DATE}}": args.start_date,
        "{{MANAGER}}": args.manager,
        "{{MANAGER_EMAIL}}": manager_email,
        "{{PORTAL_LINK}}": args.portal_link,
    }
    for i in range(1, 6):
        replacements[f"{{{{DAY{i}_DATE}}}}"] = day_labels[f"DAY{i}_DATE"]

    rendered = template_text
    for token, value in replacements.items():
        rendered = rendered.replace(token, value)
    return rendered


def build_message(args, html_body: str) -> MIMEMultipart:
    msg = MIMEMultipart("alternative")
    msg["Subject"] = args.subject
    msg["From"] = args.from_email or os.environ.get("SMTP_USER", "")
    msg["To"] = args.to_email

    plain_fallback = (
        f"Welcome to Apollo Green Solutions, {args.name}!\n\n"
        f"You're joining as {args.role} in {args.department}, starting {args.start_date}.\n"
        f"Your manager is {args.manager}.\n\n"
        "This email includes an HTML onboarding guide — please view it in an "
        "HTML-capable email client to see the full formatted version."
    )
    msg.attach(MIMEText(plain_fallback, "plain"))
    msg.attach(MIMEText(html_body, "html"))
    return msg


def resolve_smtp_settings(args):
    host = os.environ.get("SMTP_HOST")
    port = os.environ.get("SMTP_PORT")
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASSWORD")

    if not host and args.provider in PROVIDER_DEFAULTS:
        host = PROVIDER_DEFAULTS[args.provider]["host"]
    if not port and args.provider in PROVIDER_DEFAULTS:
        port = PROVIDER_DEFAULTS[args.provider]["port"]

    missing = [name for name, val in
               [("SMTP_HOST", host), ("SMTP_USER", user), ("SMTP_PASSWORD", password)]
               if not val]
    return host, int(port) if port else 587, user, password, missing


def send_email(args, msg: MIMEMultipart) -> bool:
    host, port, user, password, missing = resolve_smtp_settings(args)

    if missing:
        logger.error("Missing required SMTP configuration: %s. Set these as "
                      "environment variables (or pass --provider gmail|o365 to "
                      "default the host/port).", ", ".join(missing))
        return False

    try:
        logger.info("Connecting to %s:%s as %s", host, port, user)
        with smtplib.SMTP(host, port, timeout=20) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(user, password)
            server.sendmail(msg["From"], [args.to_email], msg.as_string())
        logger.info("Email sent successfully to %s", args.to_email)
        return True
    except smtplib.SMTPAuthenticationError as e:
        logger.error("SMTP authentication failed: %s. For Gmail, use an App "
                      "Password. For Microsoft 365, confirm SMTP AUTH is "
                      "enabled for this mailbox.", e)
    except smtplib.SMTPConnectError as e:
        logger.error("Could not connect to SMTP server %s:%s — %s", host, port, e)
    except smtplib.SMTPException as e:
        logger.error("SMTP error while sending email: %s", e)
    except OSError as e:
        logger.error("Network error while sending email: %s", e)
    except Exception as e:  # noqa: BLE001 - log unexpected errors, don't crash silently
        logger.exception("Unexpected error while sending email: %s", e)
    return False


def parse_args(argv=None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Send the Apollo Green Solutions onboarding email.")
    parser.add_argument("--name", required=True, help="New employee's full name")
    parser.add_argument("--role", required=True, help="Job title")
    parser.add_argument("--department", required=True, help="Department name")
    parser.add_argument("--start-date", required=True, dest="start_date", help='e.g. "July 21, 2026"')
    parser.add_argument("--manager", required=True, help="Manager's full name")
    parser.add_argument("--to-email", required=True, dest="to_email", help="New employee's email address")
    parser.add_argument("--manager-email", dest="manager_email", default=None,
                         help="Manager's email (defaults to a first.last@apollo-gs.com guess)")
    parser.add_argument("--from-email", dest="from_email", default=None,
                         help="Overrides the From address (defaults to SMTP_USER)")
    parser.add_argument("--portal-link", dest="portal_link", default="#",
                         help="URL for the 'Access Your Onboarding Portal' button")
    parser.add_argument("--subject", default="Welcome to Apollo Green Solutions — Your Onboarding Guide",
                         help="Email subject line")
    parser.add_argument("--provider", choices=["gmail", "o365"], default=None,
                         help="Defaults SMTP host/port if SMTP_HOST is not set")
    parser.add_argument("--template", dest="template_path", default=str(TEMPLATE_PATH),
                         help="Path to the HTML template (default: onboarding_template.html next to this script)")
    parser.add_argument("--dry-run", action="store_true",
                         help="Render the email and print/save it without sending or requiring SMTP credentials")
    parser.add_argument("--verbose", action="store_true", help="Enable debug logging")
    return parser.parse_args(argv)


def main(argv=None) -> int:
    args = parse_args(argv)
    setup_logging(args.verbose)

    template_file = Path(args.template_path)
    if not template_file.exists():
        logger.error("Template file not found: %s", template_file)
        return 1

    template_text = template_file.read_text(encoding="utf-8")
    html_body = render_template(args, template_text)
    msg = build_message(args, html_body)

    if args.dry_run:
        preview_path = SCRIPT_DIR / f"preview_{args.name.replace(' ', '_')}.html"
        preview_path.write_text(html_body, encoding="utf-8")
        logger.info("[DRY RUN] Would send email:")
        logger.info("  Subject: %s", msg["Subject"])
        logger.info("  From:    %s", msg["From"] or "(SMTP_USER not set)")
        logger.info("  To:      %s", args.to_email)
        logger.info("  Rendered HTML saved to: %s", preview_path)
        return 0

    success = send_email(args, msg)
    return 0 if success else 1


if __name__ == "__main__":
    sys.exit(main())
