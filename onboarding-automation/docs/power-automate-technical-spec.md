# Onboarding Email Sequence — Technical Specification

**System:** Microsoft Lists + Power Automate (Scheduled Cloud Flow)  
**Purpose:** Automatically send a branded onboarding email to new hires on their start date — with no IT approval or custom Azure App Registration required.

---

## 1. System Architecture

- **Data source:** Microsoft Lists ("Employee Onboarding Tracker")
- **Automation:** Power Automate flow ("Onboarding Email Sequence") — runs once per day
- **Delivery:** Office 365 Outlook connector ("Send an email (V2)") — uses the HR account's native Outlook connection (Standard tier, no Premium license required)
- **Duplicate-send protection:** `Day1Sent` boolean column in the List — flipped to `true` after each successful send

---

## 2. Microsoft Lists Schema

**List name:** `Employee Onboarding Tracker`  
**Location:** Personal site ("My lists") — `https://netorgft11981164-my.sharepoint.com/personal/ummuguslun_turkmen_apollo-gs_com`

| Display Name | Internal Name | Type | Notes |
|---|---|---|---|
| Name | **Title** | Single line of text | Default "Title" column renamed. Display name is "Name" but the internal name **Title** must be used in all formula/dynamic content references. |
| Role | Role | Single line of text | |
| Department | Department | Single line of text | |
| Manager | Manager | Single line of text | |
| StartDate | StartDate | Date and time | Format set to "Date only" (no time component) |
| NewHireEmail | NewHireEmail | Single line of text | Deliberately **not** "Person" type — new hires may not have an M365 account yet |
| Day1Sent | Day1Sent | Yes/No | Default: No. Automatically set to Yes by the flow after sending |
| Day3Sent | Day3Sent | Yes/No | **Currently unused** — see Section 5 |
| Week1Sent | Week1Sent | Yes/No | **Currently unused** — see Section 5 |

---

## 3. Power Automate Flow Structure

**Flow name:** `Onboarding Email Sequence`  
**Trigger type:** Scheduled Cloud Flow (Recurrence)

### 3.1 — Recurrence (Trigger)
- Interval: `1`
- Frequency: `Day`
- Time Zone: Explicitly set to the user's local time zone (must not be left as UTC — avoids day-boundary comparison errors)

### 3.2 — Get Items (SharePoint)

| Parameter | Value |
|---|---|
| Site Address | `https://netorgft11981164-my.sharepoint.com/personal/ummuguslun_turkmen_apollo-gs_com` |
| List Name | `Employee Onboarding Tracker` |
| Filter Query | `Week1Sent eq 0` |

> **Note:** The Site Address field must contain the plain site root URL — not a sharing link (`:l:/g/...` token format). The dropdown/picker does not always auto-detect personal sites; typing the Site Address and List Name directly as text works reliably.
>
> **Why only `Week1Sent eq 0`:** Since Week1Sent is the last flag to be set chronologically, this single condition efficiently fetches every row that still has at least one pending email stage.

### 3.3 — Apply to Each
- Input: **value** output of the "Get items" step (`body/value`)

### 3.4 — Condition (Day 1 check)

**Condition expression:**
```
and(
  lessOrEquals(item()?['StartDate'], utcNow()),
  equals(item()?['Day1Sent'], false)
)
```

> This is intentionally written as "start date has arrived or passed AND not yet sent" rather than "exactly today" — if the flow misses a day (weekend, outage, etc.) it automatically catches up on the next run.

#### True branch:

**a) Compose** — Generates the full HTML email body with dynamic fields injected (see Section 4).

**b) Send an email (V2)** — Connector: Office 365 Outlook

| Field | Value |
|---|---|
| To | `NewHireEmail` (dynamic content) |
| Subject | `Welcome to Apollo Green Solutions — Your Onboarding Guide.` (static) |
| Body | Output of the Compose action — **with no wrapper tags** (see Section 6, rich-text editor warning) |

**c) Update item** — Connector: SharePoint

| Parameter | Value |
|---|---|
| Site Address | Same as Get items |
| List Name | Same as Get items |
| Id | Current loop item's ID (dynamic content) |
| **Only field updated** | `Day1Sent = Yes (true)` |

> **Critical:** This Update item action must contain **only** the `Day1Sent` field. `Day3Sent` and `Week1Sent` must **not** be included — otherwise every Day-1 send would reset those fields and risk duplicate sends in later stages.

#### False branch: Empty (no actions)

### 3.5 — Unused Conditions: "Condition 1" and "Condition 2"

The flow contains two additional conditions after the main one. These were scaffolded for a multi-touch email sequence (Day 3 / Week 1) but **left empty after the decision was made that a single comprehensive Day-1 email is sufficient**.

**Condition 1 (Day 3 — currently unused):**
```
and(
  greaterOrEquals(utcNow(), addDays(item()?['StartDate'], 3)),
  equals(item()?['Day3Sent'], false)
)
```

**Condition 2 (Week 1 — currently unused):**
```
and(
  greaterOrEquals(utcNow(), addDays(item()?['StartDate'], 7)),
  equals(item()?['Week1Sent'], false)
)
```

Both conditions have empty True/False branches — they have no effect on flow behavior. The scaffold is ready if a multi-stage sequence is needed in the future.

---

## 4. Compose Action — Dynamic Fields and Formulas

All expressions below replace `{{TOKEN}}` placeholders in the HTML template inside the Compose action:

| Placeholder | Source / Formula |
|---|---|
| `{{NAME}}` | **Title** (dynamic content — used in 2 places) |
| `{{ROLE}}` | **Role** (dynamic content) |
| `{{DEPARTMENT}}` | **Department** (dynamic content — used in 2 places) |
| `{{START_DATE}}` | **StartDate** (dynamic content, raw ISO format — optional improvement below) |
| `{{MANAGER}}` | **Manager** (dynamic content — used in 4 places) |
| `{{MANAGER_EMAIL}}` | `concat(toLower(replace(item()?['Manager'], ' ', '.')), '@apollo-gs.com')` |
| `{{DAY1_DATE}}` | `formatDateTime(item()?['StartDate'], 'MMM d')` |
| `{{DAY2_DATE}}` | `formatDateTime(addDays(item()?['StartDate'], 1), 'MMM d')` |
| `{{DAY3_DATE}}` | `formatDateTime(addDays(item()?['StartDate'], 2), 'MMM d')` |
| `{{DAY4_DATE}}` | `formatDateTime(addDays(item()?['StartDate'], 3), 'MMM d')` |
| `{{DAY5_DATE}}` | `formatDateTime(addDays(item()?['StartDate'], 4), 'MMM d')` |

**Optional improvement (not yet applied):** `{{START_DATE}}` currently outputs the raw value (e.g. "2026-07-16"). For a more readable format:
```
formatDateTime(items('Apply_to_each')?['StartDate'], 'MMMM d, yyyy')
```
This produces e.g. "July 16, 2026".

---

## 5. Known Issues and Workarounds

- **Site Address error ("We didn't find a site with this address"):** Occurs when a sharing link is pasted. Fix: use the plain site root URL.
- **GetTable schema warning:** The "Get items" action may occasionally show an OpenAPI schema detection warning (`status code 200 does not contain a valid OpenAPI schema object`). This is **cosmetic** — the data connection continues to work; dynamic content suggestions (tokens) may not appear automatically, in which case fields can be entered manually via **fx** (expression mode).
- **Send an email (V2) — Body field rich-text editor:** This field defaults to a rich-text editor and may automatically wrap injected dynamic content with `<p>` tags. Fix: click the **\</>** (code view) icon and manually delete any `<p>`/`</p>` remnants around the token — only the bare token should remain in the field.
- **Update item fields:** Each Update item action must contain **only its own flag column** (Day1 branch → only Day1Sent; if Day3/Week1 branches are added later → only their respective fields). Other Sent fields must never be included.
- **Logo image:** The `<img src="...">` in the template now points to the official Apollo logo hosted on the company's Wix CDN (`static.wixstatic.com`). This is a live public URL that renders correctly in all email clients.
- **Licensing / Cost:** SharePoint and Office 365 Outlook connectors are **Standard** tier — included in Microsoft 365 business plans, no additional Power Automate license or Premium connector cost required.

---

## 6. Test Results (Verified)

- **First run:** Email sent successfully for the test row. All dynamic fields populated correctly. `Day1Sent` automatically set to "Yes".
- **Second run (same day):** `Day1Sent` was already "Yes" — the Condition evaluated to **False**, and all True-branch actions (Compose, Send email, Update item) were **skipped**. Duplicate-send protection confirmed working.

---

Built by Ümmu Gülsün · Apollo Green Solutions · Erasmus+ Internship 2026
