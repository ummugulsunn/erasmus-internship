# Apollo Green Solutions — Employee Onboarding Automation

Automated employee onboarding system for Apollo Green Solutions. When a new hire's details are provided, the system generates and delivers a personalized, branded welcome package via email.

## Three Levels of Automation

| Level | Method | Who Uses It | When |
|---|---|---|---|
| 🟢 **Claude Chat** | Tell Claude → MCP sends email | Alexandra / HR | Primary usage |
| 🔵 **Google Form** | Fill form → instant email | Alexandra / HR | Quick one-off |
| 🟠 **CSV Batch** | Add to spreadsheet → Monday auto-send | IT / HR | Multiple hires |

## Architecture

```
LEVEL 1 — CLAUDE CHAT (Primary)
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Claude Chat  │────▶│ MCP Email Server │────▶│ Employee Inbox  │
│ "Onboard..." │     │ (Node.js + SMTP) │     │ 📧 Branded HTML │
└──────────────┘     └──────────────────┘     └─────────────────┘

LEVEL 2 — GOOGLE FORM (Quick)
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Google Form  │────▶│ Google Apps Script│────▶│ Employee Inbox  │
│ (fill & go)  │     │ (auto-trigger)   │     │ 📧 Branded HTML │
└──────────────┘     └──────────────────┘     └─────────────────┘

LEVEL 3 — CSV BATCH (Scheduled)
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ CSV file     │────▶│ Python Scheduler │────▶│ Employee Inbox  │
│ (add row)    │     │ (Monday 09:00)   │     │ 📧 Branded HTML │
└──────────────┘     └──────────────────┘     └─────────────────┘
```

## File Structure

```
onboarding-automation/
├── README.md
├── SKILL.md                                  # Claude Enterprise Skill
├── new_employees.csv                         # Input for batch processing
├── scripts/
│   ├── send_onboarding_email.py              # SMTP email sender (Outlook/Gmail)
│   └── schedule_onboarding.py                # CSV monitor + auto-sender
├── templates/
│   ├── onboarding_email_template.html        # HTML email template (placeholders)
│   └── portal_template.html                  # Interactive onboarding portal
├── google-apps-script/
│   └── Code.gs                               # Google Form auto-trigger script
├── Maria_Schmidt_Onboarding_Email.html       # Sample output: email
└── Maria_Schmidt_Onboarding_Portal.html      # Sample output: portal
```

## Level 1: Google Form (Quick)

1. Open the Google Form link (bookmarked)
2. Fill in: Name, Role, Department, Start Date, Manager, Email
3. Click Submit
4. ✅ Branded welcome email sent instantly — zero code, zero commands

### Setup (one-time)
1. Create a Google Form with 6 fields (Full Name, Role/Job Title, Department, Start Date, Manager Name, Employee Email)
2. Link it to a Google Sheet (Responses → Sheets icon)
3. In the Sheet: Extensions → Apps Script → paste `google-apps-script/Code.gs`
4. Run `setupTrigger()` once → authorize permissions
5. Done forever

## Level 2: CSV Batch (Scheduler)

Add new hires to `new_employees.csv`:
```csv
name,role,department,start_date,manager,email,status
Maria Schmidt,Junior Energy Consultant,Engineering,2026-07-21,Alexandra Xanthopoulos,maria@apollo-gs.com,pending
```

Run manually or via cron:
```bash
# Set credentials (one-time)
export SMTP_HOST=smtp.office365.com
export SMTP_PORT=587
export SMTP_USER=hr@apollo-gs.com
export SMTP_PASSWORD=your-app-password

# Single pass
python3 scripts/schedule_onboarding.py --once --provider o365

# Auto Monday 09:00 (cron)
0 9 * * 1 cd /path/to/onboarding-automation && python3 scripts/schedule_onboarding.py --once --provider o365
```

## Email Content

Every welcome email includes:
- 🏢 Company overview (mission, 3 pillars: Hardware, Software, Services)
- 📅 Personalized first-week schedule (Day 1-5 with dates)
- ✅ Onboarding checklist (10 items)
- 👥 Key contacts (Manager, IT, HR, Office Manager)
- 🎨 Apollo branding (#004d40, #1e7a4c, logo, responsive design)

## Brand Specs

| Element | Value |
|---|---|
| Primary Dark Green | `#004d40` |
| Accent Green | `#1e7a4c` |
| Light Green BG | `#e6f5ec` |
| Body Background | `#f2f6f4` |
| Logo | `https://www.apollo-gs.com/favicon.ico` |
| Font | Helvetica, Arial, sans-serif |

## Security

- SMTP credentials: environment variables only, never in code
- `--dry-run` flag for previewing without sending
- All sends logged to `sent_log.csv` with timestamps
- Google Apps Script uses OAuth (no passwords stored)

---

Built by Ümmu Gülsün · Apollo Green Solutions · Erasmus+ Internship 2026
