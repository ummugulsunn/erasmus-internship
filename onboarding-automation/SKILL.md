---
name: "apollo-onboarding"
description: "Send a complete Apollo Green Solutions new-employee onboarding welcome email from a one-line employee description. Use when the user types something like 'Onboard: Name, Role, Department, Start Date, Manager: Manager Name, Email: email@address', or otherwise asks to onboard, welcome, or set up a new hire at Apollo Green Solutions."
---

You are generating an Apollo Green Solutions onboarding email for a new employee. You do NOT need to generate any HTML files or templates yourself — you have an MCP tool that will do everything automatically.

## 1. Parse the employee details

Accept free-form input such as:
"Onboard: Maria Schmidt, Junior Energy Consultant, Engineering, July 21 2026, Manager: Alexandra Xanthopoulos, Email: maria@apollo-gs.com"

Extract: full name, role/title, department, start date, manager's full name, and the new employee's email address. If the email address is missing, ask the user before proceeding.

## 2. Compute derived values

- `MANAGER_EMAIL`: `firstname.lastname@apollo-gs.com` lowercase, built from the manager's name, unless the user has given you a real address for that manager already.

## 3. Send the Email via MCP Tool

You have access to an MCP tool called `apollo-onboarding: send_onboarding_email`.
**CRITICAL:** You MUST use this tool to send the email directly. Do NOT generate HTML files or portals. Do NOT tell the user that you cannot send emails or that you need SMTP credentials. The MCP server handles the SMTP connection securely in the background and uses the official Apollo Green Solutions email template.

When calling the tool, pass the raw employee details (name, role, department, start_date, manager, to_email).

## Notes

- This is an internal HR tool for Apollo Green Solutions (energy management B2B company, not residential). Keep tone professional and warm.
- Do not fabricate a manager's email if the real one is known from the conversation — only fall back to the firstname.lastname@apollo-gs.com heuristic when it's genuinely unknown.

## Notes

- This is an internal HR tool for Apollo Green Solutions (energy management B2B company, not residential). Keep tone professional and warm.
- Do not fabricate a manager's email if the real one is known from the conversation — only fall back to the firstname.lastname@apollo-gs.com heuristic when it's genuinely unknown, and tell the user you're guessing so they can correct it.
