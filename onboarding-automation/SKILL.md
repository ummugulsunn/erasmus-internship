---
name: "apollo-onboarding"
description: "Generate a complete Apollo Green Solutions new-employee onboarding package (interactive portal + HTML welcome email) from a one-line employee description. Use when the user types something like 'Onboard: Name, Role, Department, Start Date, Manager: Manager Name', or otherwise asks to onboard, welcome, or set up a new hire at Apollo Green Solutions."
---

You are generating an Apollo Green Solutions onboarding package for a new employee. This skill bundles two filled-in templates and two Python scripts for automated sending — do not regenerate the HTML from scratch; fill in the bundled templates.

## 1. Parse the employee details

Accept free-form input such as:
"Onboard: Maria Schmidt, Junior Energy Consultant, Engineering, July 21 2026, Manager: Alexandra Xanthopoulos"

Extract: full name, role/title, department, start date, manager's full name. If any field is missing or ambiguous, ask the user before proceeding rather than guessing.

## 2. Compute derived values

- `NAME_SLUG`: lowercase name with spaces replaced by underscores (e.g. `maria_schmidt`) — used for filenames and the portal's localStorage key.
- `MANAGER_EMAIL`: `firstname.lastname@apollo-gs.com` lowercase, built from the manager's name, unless the user has given you a real address for that manager already (e.g. from prior conversation — Alexandra Xanthopoulos is alexandra@apollo-gs.com, the account owner).
- `DAY1_DATE` … `DAY5_DATE`: the start date plus 0–4 days, formatted like "Jul 21". If the start date doesn't parse cleanly, leave these blank rather than guessing.
- `GENERATED_DATE`: today's date.

## 3. Fill the two templates

Read `templates/portal_template.html` and `templates/onboarding_email_template.html` from this skill's directory. Replace every `{{TOKEN}}` placeholder (NAME, ROLE, DEPARTMENT, START_DATE, MANAGER, MANAGER_EMAIL, DAY1_DATE…DAY5_DATE, GENERATED_DATE, NAME_SLUG, PORTAL_LINK) with the values from steps 1–2. Use a simple literal string replace, not a templating engine — do not touch any other `{` or `}` characters (there are none of concern in these files, but be careful regardless).

Leave `{{PORTAL_LINK}}` as `#` unless the user has given you a real hosted URL for the portal.

## 4. Save and present the outputs

Write the two filled files to the outputs folder as:
- `{NAME_SLUG}_Onboarding_Portal.html` (the interactive artifact — present this to the user; it has a live progress bar and clickable checklist)
- `{NAME_SLUG}_Onboarding_Email.html` (the raw HTML email, ready to paste into an email client or feed to the sending script)

Present both files with `mcp__cowork__present_files`.

## 5. Mention the automation scripts

This skill also bundles `scripts/send_onboarding_email.py` and `scripts/schedule_onboarding.py` (SMTP sending + CSV batch automation, with `--dry-run` support). If the user wants to actually send the email, point them at these scripts rather than trying to send mail directly — sending real email on the user's behalf requires their explicit go-ahead and their own SMTP credentials (SMTP_HOST/SMTP_USER/SMTP_PASSWORD as environment variables). Never invent or send with credentials yourself.

## Notes

- This is an internal HR tool for Apollo Green Solutions (energy management B2B company, not residential). Keep tone professional and warm.
- Do not fabricate a manager's email if the real one is known from the conversation — only fall back to the firstname.lastname@apollo-gs.com heuristic when it's genuinely unknown, and tell the user you're guessing so they can correct it.
