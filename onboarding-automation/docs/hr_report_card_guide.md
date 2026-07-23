# Power Automate — Monthly HR Report Card Implementation Guide

This guide walks you through creating a **new** Power Automate flow that sends a monthly HR summary email to management on the 1st of every month.

---

## Prerequisites

Before starting, make sure:
- ✅ `Employee Onboarding Tracker` list has `EndDate` column (from offboarding setup)
- ✅ You have the `hr_report_card_template.html` file ready

---

## STEP 1: Create a New Flow

1. Go to **Power Automate** → **My flows** → **+ New flow** → **Scheduled cloud flow**
2. Flow name: `Monthly HR Report Card`
3. Starting: **Today's date**
4. Repeat every: **1 Month**
5. On these days: *leave default*
6. At these hours: **8** (08:00)
7. Click **Create**

---

## STEP 2: Get All Employees

Add action → **SharePoint — Get items**

| Field | Value |
|---|---|
| Site Address | *(your SharePoint site)* |
| List Name | `Employee Onboarding Tracker` |
| Top Count | `500` |

> **Note:** No filter — we need ALL rows to calculate headcount, new hires, and departures.

---

## STEP 3: Initialize Variables

Add 3 **Initialize variable** actions:

### Variable 1: NewHiresHTML
| Field | Value |
|---|---|
| Name | `NewHiresHTML` |
| Type | String |
| Value | *(empty)* |

### Variable 2: DeparturesHTML
| Field | Value |
|---|---|
| Name | `DeparturesHTML` |
| Type | String |
| Value | *(empty)* |

### Variable 3: TotalCount
| Field | Value |
|---|---|
| Name | `TotalCount` |
| Type | Integer |
| Value | `0` |

---

## STEP 4: Apply to each — Process Employees

Add **Apply to each** → value: `body/value` (from Get items)

Inside the loop, add **3 conditions**:

### Condition A: Is New Hire This Month?

```
equals(
  formatDateTime(items('Apply_to_each')?['StartDate'], 'yyyy-MM'),
  formatDateTime(utcNow(), 'yyyy-MM')
)
```

**Yes branch** → **Append to string variable** (`NewHiresHTML`):
```html
<tr>
  <td style="padding:10px 16px;border-bottom:1px solid #e8efe9;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#2d3a2e;">@{items('Apply_to_each')?['Title']}</td>
  <td style="padding:10px 16px;border-bottom:1px solid #e8efe9;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#2d3a2e;">@{items('Apply_to_each')?['Role']}</td>
  <td style="padding:10px 16px;border-bottom:1px solid #e8efe9;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#2d3a2e;">@{items('Apply_to_each')?['Department']}</td>
  <td style="padding:10px 16px;border-bottom:1px solid #e8efe9;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#2d3a2e;">@{formatDateTime(items('Apply_to_each')?['StartDate'], 'MMMM d, yyyy')}</td>
</tr>
```

### Condition B: Is Leaving in Next 30 Days?

```
and(
  not(empty(items('Apply_to_each')?['EndDate'])),
  greaterOrEquals(items('Apply_to_each')?['EndDate'], utcNow()),
  lessOrEquals(items('Apply_to_each')?['EndDate'], addDays(utcNow(), 30))
)
```

**Yes branch** → **Append to string variable** (`DeparturesHTML`):
```html
<tr>
  <td style="padding:10px 16px;border-bottom:1px solid #e8efe9;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#2d3a2e;">@{items('Apply_to_each')?['Title']}</td>
  <td style="padding:10px 16px;border-bottom:1px solid #e8efe9;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#2d3a2e;">@{items('Apply_to_each')?['Role']}</td>
  <td style="padding:10px 16px;border-bottom:1px solid #e8efe9;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#2d3a2e;">@{items('Apply_to_each')?['Department']}</td>
  <td style="padding:10px 16px;border-bottom:1px solid #e8efe9;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#2d3a2e;">@{formatDateTime(items('Apply_to_each')?['EndDate'], 'MMMM d, yyyy')}</td>
</tr>
```

### Always: Increment Total Count
After the conditions (not inside Yes/No), add **Increment variable**:
| Field | Value |
|---|---|
| Name | `TotalCount` |
| Value | `1` |

---

## STEP 5: Count Results (After Apply to each)

Add **Filter Array** actions outside the loop:

### Filter Array - New Hires
| From | `body/value` (Get items output) |
| Condition | `formatDateTime(item()?['StartDate'], 'yyyy-MM')` is equal to `formatDateTime(utcNow(), 'yyyy-MM')` |

### Filter Array - Departures
| From | `body/value` |
| Condition | Complex expression (use advanced mode) — same as Condition B above |

Then use:
- `length(body('Filter_array_-_New_Hires'))` → New hires count
- `length(body('Filter_array_-_Departures'))` → Departures count
- `length(body('Get_items')?['value'])` → Total headcount

---

## STEP 6: Compose the Report Email

Add **Compose** action → paste the `hr_report_card_template.html` content.

Replace these placeholders with dynamic content/expressions:

| Placeholder | Replace With |
|---|---|
| `{{MONTH_YEAR}}` | `formatDateTime(utcNow(), 'MMMM yyyy')` |
| `{{TOTAL_HEADCOUNT}}` | `length(body('Get_items')?['value'])` |
| `{{NEW_HIRES_COUNT}}` | `length(body('Filter_array_-_New_Hires'))` |
| `{{DEPARTURES_COUNT}}` | `length(body('Filter_array_-_Departures'))` |
| `{{NEW_HIRES_ROWS}}` | `variables('NewHiresHTML')` |
| `{{DEPARTURES_ROWS}}` | `variables('DeparturesHTML')` |
| `{{REPORT_DATE}}` | `formatDateTime(utcNow(), 'MMMM d, yyyy')` |

> **Note:** For `{{DEPARTMENT_ROWS}}`, this is more complex (requires grouping by department). For the v1 draft, you can hardcode Apollo's department list or skip this section initially.

---

## STEP 7: Send the Report

Add **Send an email (V2)**

| Field | Value |
|---|---|
| To | `alexandra@apollo-gs.com` *(or HR distribution)* |
| Subject | `Monthly HR Report Card — @{formatDateTime(utcNow(), 'MMMM yyyy')}` |
| Body | `outputs('Compose_HR_Report')` |
| Is HTML | **Yes** |

---

## STEP 8: Test

1. Add at least 2 test rows to the Employee Onboarding Tracker:
   - One with `StartDate` in the current month (will appear as New Hire)
   - One with `EndDate` within the next 30 days (will appear as Upcoming Departure)
2. Click **Test → Manually** → **Run flow**
3. Check the email arrives with correct data
4. Verify counts match

---

## Flow Summary

```
Recurrence (Monthly, 1st, 08:00)
  └── Get items (Employee Onboarding Tracker, no filter)
  └── Initialize variable: NewHiresHTML
  └── Initialize variable: DeparturesHTML
  └── Initialize variable: TotalCount
  └── Filter Array: New Hires (StartDate = this month)
  └── Filter Array: Departures (EndDate within 30 days)
  └── Apply to each
  │     ├── Condition: New Hire? → Append to NewHiresHTML
  │     ├── Condition: Departing? → Append to DeparturesHTML
  │     └── Increment TotalCount
  └── Compose HR Report (HTML template with dynamic content)
  └── Send email (V2) to management
```

---

## Future Enhancements (v2)

- **Department breakdown**: Group headcount by department using nested loops
- **Historical archive**: Save each month's report to a "HR Reports Archive" list
- **AI narrative**: If Premium PA license is approved, add a Claude API call to generate a friendly summary paragraph
