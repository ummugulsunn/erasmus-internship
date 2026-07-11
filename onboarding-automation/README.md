# Apollo Green Solutions — Employee Onboarding Automation

Automated employee onboarding system built with Claude Enterprise for Apollo Green Solutions. When a new hire's details are added, the system generates a personalized onboarding package and delivers it via email — complete with Apollo branding, a first-week schedule, interactive checklist, and key contacts.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Claude Enterprise                   │
│                                                      │
│  ┌──────────────┐    ┌────────────────────────────┐  │
│  │ Claude Skill │───▶│ Generate Onboarding Package│  │
│  │ "Onboard: …" │    │ (Portal + HTML Email)      │  │
│  └──────────────┘    └────────────┬───────────────┘  │
│                                   │                  │
└───────────────────────────────────┼──────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────┐
│              Python Automation Layer                   │
│                                                        │
│  new_employees.csv ──▶ schedule_onboarding.py          │
│       (pending)              │                         │
│                              ▼                         │
│                    send_onboarding_email.py             │
│                              │                         │
│                              ▼                         │
│                    SMTP (Outlook / Gmail)               │
│                              │                         │
│                              ▼                         │
│                 ┌─────────────────────────┐             │
│                 │  New Employee Inbox      │             │
│                 │  📧 Branded HTML Email   │             │
│                 └─────────────────────────┘             │
└───────────────────────────────────────────────────────┘
```

## File Structure

```
onboarding-automation/
├── SKILL.md                                  # Claude Skill definition
├── README.md                                 # This file
├── new_employees.csv                         # Input: add new hires here
├── scripts/
│   ├── send_onboarding_email.py              # Sends branded HTML email via SMTP
│   └── schedule_onboarding.py                # Monitors CSV, auto-sends pending rows
├── templates/
│   ├── onboarding_email_template.html        # HTML email template (with placeholders)
│   └── portal_template.html                  # Interactive onboarding portal
├── Maria_Schmidt_Onboarding_Email.html       # Sample output: email
└── Maria_Schmidt_Onboarding_Portal.html      # Sample output: portal
```

## Quick Start

### 1. Claude Skill (Interactive)
In Claude Enterprise, trigger the skill by typing:
```
Onboard: Maria Schmidt, Junior Energy Consultant, Engineering, July 21 2026, Manager: Alexandra Xanthopoulos
```
Claude generates both the interactive portal artifact and the HTML email.

### 2. Send Email (Manual)
```bash
# Set SMTP credentials
export SMTP_HOST=smtp.office365.com
export SMTP_PORT=587
export SMTP_USER=hr@apollo-gs.com
export SMTP_PASSWORD=your-app-password

# Dry run (preview without sending)
python scripts/send_onboarding_email.py \
  --name "Maria Schmidt" \
  --role "Junior Energy Consultant" \
  --department "Engineering" \
  --start-date "July 21, 2026" \
  --manager "Alexandra Xanthopoulos" \
  --to-email "maria.schmidt@apollo-gs.com" \
  --provider o365 \
  --dry-run

# Send for real (remove --dry-run)
python scripts/send_onboarding_email.py \
  --name "Maria Schmidt" \
  --role "Junior Energy Consultant" \
  --department "Engineering" \
  --start-date "July 21, 2026" \
  --manager "Alexandra Xanthopoulos" \
  --to-email "maria.schmidt@apollo-gs.com" \
  --provider o365
```

### 3. Automated Batch (Scheduler)
Add new hires to `new_employees.csv`:
```csv
name,role,department,start_date,manager,email,status
Maria Schmidt,Junior Energy Consultant,Engineering,2026-07-21,Alexandra Xanthopoulos,maria.schmidt@apollo-gs.com,pending
```

Run the scheduler:
```bash
# Single pass (for cron jobs)
python scripts/schedule_onboarding.py --once --provider o365

# Continuous loop (fires every Monday at 09:00)
python scripts/schedule_onboarding.py --provider o365
```

Cron entry for Monday 09:00:
```
0 9 * * 1 cd /path/to/onboarding-automation && python3 scripts/schedule_onboarding.py --once --provider o365 >> scheduler_cron.log 2>&1
```

## SMTP Configuration

| Provider | Host | Port | Notes |
|---|---|---|---|
| Microsoft 365 | `smtp.office365.com` | 587 | SMTP AUTH must be enabled by tenant admin |
| Gmail | `smtp.gmail.com` | 587 | Requires App Password (2FA account) |

## Brand Specs

| Element | Value |
|---|---|
| Primary Dark Green | `#004d40` |
| Accent Green | `#1e7a4c` |
| Light Green BG | `#e6f5ec` |
| Body Background | `#f2f6f4` |
| Logo | `https://www.apollo-gs.com/favicon.ico` |
| Font | Helvetica, Arial, sans-serif |

## Security Notes

- SMTP credentials are read from **environment variables only** — never hardcoded
- The `--dry-run` flag renders the email locally without sending
- All sent emails are logged to `sent_log.csv` with timestamps
- The scheduler updates CSV row status from `pending` → `sent` or `failed`

---

Built by Ümmu Gülsün · Apollo Green Solutions · Erasmus+ Internship 2026
