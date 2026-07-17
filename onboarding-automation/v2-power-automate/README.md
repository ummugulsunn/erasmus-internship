# v2 — Power Automate System (Current · Production)

This is the live, production onboarding automation system deployed at Apollo Green Solutions.

## How it works

HR adds a new row to **Microsoft Lists → Employee Onboarding Tracker**.  
Power Automate wakes up every morning at **08:00** and automatically sends the welcome email.  
No code. No installation. No IT approval needed.

## Key files

| File | Description |
|---|---|
| [`../docs/power-automate-technical-spec.md`](../docs/power-automate-technical-spec.md) | Full technical specification: flow structure, OData filters, dynamic field formulas, known issues |
| [`../docs/screenshot-flow-success.png`](../docs/screenshot-flow-success.png) | Power Automate flow — successful run |
| [`../docs/screenshot-lists-tracker.png`](../docs/screenshot-lists-tracker.png) | Microsoft Lists — Employee Onboarding Tracker |
| [`../docs/screenshot-email-result.png`](../docs/screenshot-email-result.png) | Delivered email in corporate Outlook |

## To transfer to another account (Handover)

1. In Power Automate: open the flow → **Export → Package (.zip)**
2. Send the `.zip` to the new owner
3. New owner: **Import** → when prompted, authorize their own Outlook and SharePoint connections
4. Done — all emails will now send from their account

## Microsoft Lists schema

| Column | Type | Notes |
|---|---|---|
| Name (Title) | Single line of text | Internal name: Title |
| Role | Single line of text | |
| Department | Single line of text | |
| Manager | Single line of text | |
| StartDate | Date only | No time component |
| NewHireEmail | Single line of text | Not "Person" type |
| Day1Sent | Yes/No | Default: No |
| Day3Sent | Yes/No | Scaffolded for future use |
| Week1Sent | Yes/No | Used as OData filter (`Week1Sent eq 0`) |
