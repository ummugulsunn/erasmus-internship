# Onboarding & Offboarding Automation
## Phase 3 Roadmap
**Offboarding automation · interactive portal link · manager-editable content · monthly HR report card**

### Executive Summary

All four requests are achievable this month with what we already have — Microsoft Lists, Power Automate Standard connectors, and Office 365 Outlook — no IT ticket, no Azure App Registration, and (for three of the four) no additional licensing cost.

The one item that genuinely wants a paid capability — AI-generated email content straight from a Word/PDF document — has a real, working, zero-cost path today (Option C below) and a clear, better upgrade path later if the business ever approves a Premium Power Automate license. I recommend building the zero-cost version now and treating true AI-generation as a future enhancement, not a blocker.

Build order matters: offboarding automation should come first, because the HR Report Card (item 4) depends on the EndDate column it introduces.

### 4-Week Plan

| Week | Focus | Deliverable | Depends on |
|---|---|---|---|
| Week 1 | Offboarding automation (item 1) + portal CTA button (item 2) | New EndDate/OffboardingSent columns; offboarding branch live and tested; portal link added to welcome email | Nothing — can start today |
| Week 2 | Manager-editable email content (item 3, Option C) | “Onboarding Email Content” list live; checklist + intro text pulled dynamically; manager does a live test edit | Nothing |
| Week 3 | HR Report Card (item 4) | Monthly flow built, department list confirmed, first report run manually and reviewed | EndDate column from Week 1 |
| Week 4 | Regression test everything together + documentation | All 3 new flows verified end to end; technical doc updated; handover-ready | Weeks 1–3 |

---

### 1. Offboarding Email Automation

**List changes**
Add two columns to Employee Onboarding Tracker:
- `EndDate` — Date and time (Date only), same type as StartDate
- `OffboardingSent` — Yes/No, default No, same type as Day1Sent

**Get items — OData filter**
Right now the filter is `Week1Sent eq 0`. Because Week1Sent is never actually set to Yes (Koşul 2 is empty), this filter currently returns every row, every day, regardless of Day1Sent. Two options:
- **Zero-risk**: leave it exactly as is. It still returns every row, so the new offboarding condition will still see every candidate row. No change needed here at all.
- **Recommended cleanup**: change it to `OffboardingSent eq 0`. Once someone is fully offboarded there's nothing left to check for that row ever again, so this becomes the correct “last gate” — same logic Week1Sent was originally meant to serve.

**Condition branch — reuse the existing empty “Koşul 1”**
You already have two unused, empty condition shells (Koşul 1 / Koşul 2) left over from the original Day 3 / Week 1 design. Reuse Koşul 1 rather than adding a fourth branch — keeps the flow tidy.

1. Open the flow in edit mode and click into Koşul 1.
2. (Optional) Click the “…” on the condition card → Rename → call it “Offboarding Check.”
3. Replace its condition with the expression below (click fx / edit in advanced mode on each side, same visual builder you used for the Day-1 condition):
   ```
   and(
     lessOrEquals(item()?['EndDate'], addDays(utcNow(), 14)),
     equals(item()?['OffboardingSent'], false)
   )
   ```

Same catch-up-safe pattern as Day 1: it reads as “end date is 14 days away or closer, AND we haven't sent the offboarding email yet” — so a missed daily run still self-heals the next time the flow executes.

**True branch — three actions, same shape as the Day-1 branch**
1. **Oluştur (Compose)** — paste your existing offboarding HTML template here. Replace its `{{TOKENS}}` with dynamic content / expressions the same way the welcome email works, for example:
   - `{{NAME}}` → `Title`
   - `{{MANAGER}}` → `Manager`
   - `{{END_DATE}}` → `formatDateTime(item()?['EndDate'], 'MMMM d, yyyy')`
2. **E-posta gönder (V2)** — To: `NewHireEmail`, Subject: a static line such as “Your Last Day at Apollo — Offboarding Checklist Inside,” Body: the bare Compose output (strip any stray `<p>` tags the rich-text editor adds, exactly like before).
3. **Öğeyi güncelleştir (Update item)** — set ONLY `OffboardingSent = Evet`.
   - ⚠️ *Do not include Day1Sent, Day3Sent, or Week1Sent in this Update item action, even unchanged. Adding them re-writes those fields every run and risks silently resetting a flag that was already correctly set — this is exactly the bug we caught and fixed in the original Day-1 branch.*

> **Note**: A nice optional polish for later: a “days remaining” countdown in the email body is possible via `div(sub(ticks(item()?['EndDate']), ticks(utcNow())), 864000000000)`, but it's not required to ship this.

**Testing**
Same five-check pattern used for Day 1: add a test row with EndDate 10 days out and OffboardingSent = No, run the flow manually, confirm the email arrives correctly formatted, confirm OffboardingSent flips to Yes, run again and confirm the second run skips it.

---

### 2. Interactive Portal Button in the Onboarding Email

Since the Phase 2 portal is live on GitHub Pages, this is a 10-minute change: one new table row inside the existing Compose HTML, no flow logic involved.

**Where to place it**
Insert the new block right after the existing Task Checklist section closes, before the Divider that leads into Key Contacts — positioning it as the natural “want an interactive version of this?” follow-up to the static checklist immediately above it.

```html
...
  </table>
 </td></tr>
 <!-- ← existing Task Checklist section ends here -->
 <!-- NEW: Portal CTA button goes here -->
 <!-- Divider --> → existing, leads into Key Contacts
...
```

**The button snippet**
```html
<tr><td style="padding:8px 36px 28px 36px;" align="center">
  <a href="{{PORTAL_URL}}" style="display:inline-block;background-color:#1e7a4c; color:#ffffff;font-family:Helvetica,Arial,sans-serif;font-size:14px; font-weight:bold;padding:12px 28px;border-radius:6px;text-decoration:none;">
    Open Your Interactive Onboarding Portal →
  </a>
</td></tr>
```
Replace `{{PORTAL_URL}}` with your real GitHub Pages address (e.g. `https://<username>.github.io/<repo>/`).

> ⚠️ *Personalization gap to be aware of: the portal page as built reads `{{NAME}}`/`{{NAME_SLUG}}`-style placeholders meant to be swapped per recipient before sending. A single GitHub Pages URL is the same static file for everyone, so unless the button link appends the person's details as a query string (e.g. `?name=Jordan&slug=jordan-lee`) and the portal's JavaScript is updated to read those from the URL instead of a hardcoded token, every new hire will land on a page that still literally says “Welcome, {{NAME}}.” Worth fixing before this goes live broadly — happy to make that portal change if useful.*

---

### 3. AI-Powered Email Content from a SharePoint Document

**Goal**: your manager edits a Word/PDF document on SharePoint, and the email content updates itself — no HTML, no flow editing.

**Option comparison**

| Option | License / permissions | Complexity | Recommendation |
|---|---|---|---|
| **A. AI Builder** | Needs paid AI Builder credits in most cases. M365 E3/E5 seed 2,000 credits/user/month today, but Microsoft is removing seeded AI Builder credits tenant-wide on Nov 1, 2026 in favor of paid Copilot Credits — the free path is closing in a few months. | Medium–High | **Not recommended**. Even where free credits exist right now, they're being discontinued shortly, which is a bad foundation for something a non-technical manager needs to keep running long after this project ends. |
| **B. HTTP → Claude/OpenAI API** | The generic HTTP action is a Premium connector — requires a paid Power Automate per-user/per-flow plan not included in standard Microsoft 365. There is no clean Standard-tier way to call an external AI API directly. | Medium | **Not buildable today** under the “no premium license” constraint. Keep this as the upgrade path if the business ever approves a Premium license — it would give far more control over the generated HTML than AI Builder's prebuilt models. |
| **C. No AI — editable SharePoint List** | Standard connectors only (SharePoint, already in use). No new license, no approval needed. | Low–Medium | **Recommended**. Ships this week for zero cost, fully satisfies “manager edits content, never touches HTML,” and is the most maintainable option for someone non-technical running this after you leave. |
| **D. Alternative considered** | Parsing an arbitrary Word/PDF layout without AI (rigid section markers, manual text splitting). | High / fragile | **Not recommended** — more brittle than Option C for no real benefit, since it still can't handle the document being reformatted without breaking. |

**Recommended build — Option C, step by step**
1. Create a new SharePoint list called “Onboarding Email Content” with a single row (this is shared, tenant-wide content, not per-hire). Suggested columns: `WelcomeIntroText` (multiple lines of text), `ChecklistItems` (multiple lines of text, one task per line).
2. In the flow, add a new “Öğeyi al” (Get item, by Id = 1) step near the top, before Apply to each — this content is the same for every recipient, so it only needs to be fetched once per run.
3. Add a Data Operation “Bölme” (Split) action on `ChecklistItems`, delimiter `\n`, to turn the multi-line text into an array of individual tasks.
4. Add a Data Operation “Seç” (Select) action that maps each array item into its own HTML row, e.g. `<tr><td>☐ &nbsp;&nbsp;@{item()}</td></tr>`.
5. Add a Data Operation “Birleştir” (Join) action with an empty separator to combine that array back into one HTML block.
6. In the main Compose action, replace the old hardcoded checklist `<tr>` rows with the Join step's output, inserted at that exact spot in the HTML string — the same way `{{NAME}}` etc. are inserted today. Do the same for `WelcomeIntroText`, dropped directly into the intro paragraph.
7. Test: have your manager edit the list row's text, run the flow manually, and confirm the email reflects her change exactly — this is the moment that proves she can run this without you.

> **Note**: Start with just the intro paragraph and the checklist — the two sections most likely to actually change month to month. The 5-day schedule and Key Contacts can stay static for now and be made editable later the same way, if needed.

---

### 4. HR Report Card — Monthly Summary

**Concept**: a second Scheduled Cloud Flow, running monthly, that reads the same Employee Onboarding Tracker list and reports three things: who joined this month, who's leaving in the next 30 days, and current headcount by department.

**On the AI angle**: On “Claude tagging who's coming and who's finishing”: this specific classification is pure date-range filtering on data you already have (StartDate, EndDate) — fully deterministic and 100% accurate without AI. I'd keep it rule-based rather than introduce a language model here, since HR headcount numbers are exactly the kind of thing that shouldn't carry hallucination risk. If she'd later like a friendly written narrative wrapped around the numbers (“This month Apollo welcomed 3 new colleagues to Hardware…”), that's a nice polish layer that could sit on top once Option B from item 3 becomes available — but the underlying tagging should stay as-is.

**Draft implementation**
1. **New flow**: “Monthly HR Report Card,” Recurrence trigger, monthly, day 1, 08:00.
2. Get items on Employee Onboarding Tracker, no filter — pull every row.
3. Filter array “New hires this month”:
   `equals(formatDateTime(item()?['StartDate'], 'yyyy-MM'), formatDateTime(utcNow(), 'yyyy-MM'))`
4. Filter array “Leaving in next 30 days” (depends on the EndDate column from item 1):
   ```
   and(
     greaterOrEquals(item()?['EndDate'], utcNow()),
     lessOrEquals(item()?['EndDate'], addDays(utcNow(), 30))
   )
   ```
5. **Headcount by department**: rather than a new list, use a Compose/Initialize Variable holding a fixed array of Apollo's department names (confirm the exact list — e.g. Hardware, Software, Services, Sales & Marketing, HR, Finance). Loop over that array with Apply to each; inside, run a Filter array where Department equals the current loop value, then `length(...)` gives that department's headcount. Append each `{Department, Count}` pair to an array variable.
6. Compose a single HTML report combining the three results into simple tables, matching the existing Apollo brand styling.
7. Send an email V2 with that report to your manager (and/or an HR distribution address).
8. Optional: also “Create item” in a small new “Monthly HR Reports Archive” list (Month, NewHiresCount, DeparturesCount, TotalHeadcount) to build a historical trend line over time. Nice to have, not required for v1.

---

### Appendix — Constraints Recap
- No IT admin involvement required for items 1, 2, 3, or 4.
- No Azure App Registration anywhere in this roadmap.
- Standard Microsoft 365 connectors only — SharePoint and Office 365 Outlook, exactly what's already in use.
- Item 3's Option B (true AI generation) is the only piece that needs a business decision on Premium licensing — explicitly deferred, not part of this 4-week plan.
- Everything above uses the same visual condition builder, Compose/Update-item patterns, and partial-update discipline already proven in the working Day-1 flow — nothing new to learn, just repeated correctly.
