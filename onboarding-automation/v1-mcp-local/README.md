# v1 — Claude MCP + Python System (Archived)

This is the original onboarding automation system built during the first phase of the internship project.

> **Status: Archived.** See [`../v2-power-automate/`](../v2-power-automate/) for the current production system.

## Why it was archived

The corporate Microsoft 365 tenant enforces **Modern Authentication (OAuth2) only**. SMTP App Passwords are disabled organization-wide — this is a tenant-level security policy enforced by Microsoft, not a configuration issue.

Any application sending mail through a corporate `@apollo-gs.com` account via SMTP requires an Azure App Registration with IT admin consent. Rather than route through IT, the system was rebuilt as v2 using Power Automate's pre-approved Outlook connector.

> **The v1 system works perfectly for Gmail or any SMTP-compatible account.**

## Architecture

```
LEVEL 1 — CLAUDE CHAT (Primary)
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Claude Chat  │────▶│ MCP Email Server │────▶│ Employee Inbox  │
│ "Onboard…"   │     │ (Node.js + SMTP) │     │ 📧 Branded HTML │
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

## File structure

```
v1-mcp-local/
├── mcp-email-server/
│   └── server.mjs                    # Node.js MCP email server
├── scripts/
│   ├── send_onboarding_email.py      # SMTP email sender (Gmail/Outlook)
│   └── schedule_onboarding.py        # CSV monitor + auto-sender
├── templates/
│   ├── onboarding_email_template.html
│   └── portal_template.html
├── google-apps-script/
│   └── Code.gs                       # Google Form trigger
├── SKILL.md                          # Claude Desktop skill definition
├── claude_desktop_config_template.json
├── install_apollo_onboarding.bat     # Windows one-click installer
└── new_employees.csv                 # Batch input format
```

## Quick start (Gmail)

```bash
# 1. Install MCP server
cd mcp-email-server && npm install

# 2. Set credentials
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USER=your@gmail.com
export SMTP_PASSWORD=your-app-password

# 3. Run batch sender
python3 scripts/schedule_onboarding.py --once

# 4. Or use Claude Desktop — type:
# "Onboard Maria Schmidt, Junior Energy Consultant,
#  Engineering, starting July 21, send to maria@example.com"
```
