# Changelog

All notable changes to the Apollo Onboarding Automation system.

---

## [v2.0.0] — 2026-07-17 · Power Automate Migration

### Added
- **Microsoft Lists database** — `Employee Onboarding Tracker` with 9 columns (Name, Role, Department, Manager, StartDate, NewHireEmail, Day1Sent, Day3Sent, Week1Sent)
- **Power Automate scheduled flow** — "Onboarding Email Sequence" runs daily at 08:00
- **Three-stage email sequence** — Day 1 (welcome), Day 3 (check-in), Week 1 (recap)
- **Catch-up logic** — `greaterOrEquals` date formulas ensure emails send even if flow misses a day
- **Compose action pattern** — Raw HTML template bypasses Power Automate's rich-text editor
- **Boolean flag system** — Day1Sent / Day3Sent / Week1Sent prevent duplicate sends
- **Real corporate logo** — Resolved from official Apollo website CDN (Wix static assets)

### Changed
- Email sender is now the corporate `@apollo-gs.com` Outlook account (no IT approval needed — uses pre-consented Outlook V2 connector)
- HR workflow simplified to: open Microsoft Lists → add row → done

### Fixed
- SharePoint 404 error: Site Address must be site root URL only, not full list URL
- Logo broken image: replaced `favicon.ico` src with actual PNG from company CDN
- `body` style: added `width:100% !important; height:100% !important;` for mail gateway compatibility

### Why this change
Corporate M365 tenant enforces Modern Auth (OAuth2) only. SMTP App Passwords are disabled organization-wide. Power Automate uses a pre-approved OAuth connector, requiring zero IT involvement.

---

## [v1.0.0] — 2026-07-15 · Initial Release

### Added
- **Claude Desktop MCP integration** — Natural language command triggers email send via custom Node.js server
- **MCP email server** (`mcp-email-server/server.mjs`) — Node.js server exposing `send_onboarding_email` tool to Claude
- **Python SMTP sender** (`scripts/send_onboarding_email.py`) — Supports Gmail and Outlook (O365)
- **Python batch scheduler** (`scripts/schedule_onboarding.py`) — Monitors CSV, auto-sends every Monday 09:00
- **Google Apps Script integration** (`google-apps-script/Code.gs`) — Google Form → instant email trigger
- **HTML email template** (`templates/onboarding_email_template.html`) — Fully branded, responsive, Outlook-compatible
- **Interactive onboarding portal** (`templates/portal_template.html`) — Standalone HTML portal for new hires
- **Claude Skill definition** (`SKILL.md`) — Enables Claude to understand onboarding commands
- **CSV input format** (`new_employees.csv`) — Batch processing input
- **Windows installer** (`install_apollo_onboarding.bat`) — One-click setup for non-technical users
- **Sample outputs** — Maria Schmidt onboarding email and portal as reference

### Architecture (v1)
- Level 1: Claude Chat → MCP Server → SMTP → employee inbox
- Level 2: Google Form → Google Apps Script → SMTP → employee inbox  
- Level 3: CSV file → Python scheduler → SMTP → employee inbox

---

Built by Ümmu Gülsün · Apollo Green Solutions · Erasmus+ Internship 2026
