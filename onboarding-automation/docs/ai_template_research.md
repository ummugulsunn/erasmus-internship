# Research Findings: AI Automation for Email HTML Generation

**Prepared by:** Ümmügülsün
**Date:** July 23, 2026

## 1. Executive Summary
The objective of this research is to evaluate the feasibility of using AI to automatically generate the HTML for onboarding and offboarding emails directly from a SharePoint document, as requested.

While technically possible, leveraging an external AI API or Microsoft's AI Builder presents significant licensing and long-term viability challenges given Apollo's current constraints (no Premium Power Automate licenses, no IT admin involvement). Therefore, the recommended approach is **Option C: Editable SharePoint List**, which provides dynamic content injection without the overhead or risks associated with AI generation.

## 2. Three Options Evaluated

### Option A: AI Builder (Microsoft's built-in AI)
- **How it works:** Power Automate includes AI Builder actions capable of extracting text from documents.
- **Pros:** Native Microsoft integration; no external API required.
- **Cons:** Requires AI Builder credits. While Microsoft 365 E3/E5 currently seed 2,000 credits/user/month, Microsoft has announced the removal of seeded AI Builder credits tenant-wide starting **November 1, 2026**. After this date, paid Copilot Credits will be required. This makes it a poor foundation for long-term automation.
- **Verdict:** **NOT RECOMMENDED** for Apollo.

### Option B: External AI API (Claude/OpenAI via HTTP connector)
- **How it works:** A Power Automate HTTP action calls an external API (like Claude or OpenAI), sends the document content, and receives the generated HTML.
- **Pros:** The most powerful and flexible solution; can genuinely generate custom HTML from various document formats.
- **Cons:** The HTTP connector is a **PREMIUM** connector. It requires a paid Power Automate per-user or per-flow plan and is not available under the standard Microsoft 365 license.
- **Verdict:** **NOT BUILDABLE TODAY**. Keep this as an upgrade path if the business approves Premium licenses in the future.

### Option C: Editable SharePoint List (No AI — Recommended)
- **How it works:** Create a new SharePoint list named 'Onboarding Email Content' with editable text fields. The manager updates this list directly. Power Automate reads the list and dynamically injects the content into the HTML template.
- **Implementation steps:**
  1. Create an 'Onboarding Email Content' list with specific columns (e.g., `WelcomeIntroText`, `ChecklistItems` with one item per line).
  2. Add a 'Get item' action in Power Automate before the 'Apply to each' loop.
  3. Split `ChecklistItems` by a newline into an array.
  4. Select each item and format it into an HTML row.
  5. Join the rows into a single HTML block.
  6. Replace hardcoded sections in a Compose action with this dynamic content.
- **Pros:** Zero additional cost (uses Standard connectors only), allows the manager to edit content without technical knowledge, and is highly maintainable long-term.
- **Cons:** It is not truly 'AI-generated' as the manager still writes the content. However, this mitigates hallucination risks, which is crucial for HR-related content.
- **Verdict:** **RECOMMENDED**. Can be shipped this week.

## 3. Comparison Table

| Feature | Option A (AI Builder) | Option B (External AI) | Option C (Editable List) |
| :--- | :--- | :--- | :--- |
| **License Cost** | Free now, paid after Nov 2026 | Premium PA license required | Free (Standard) |
| **Setup Complexity** | Medium | Medium | Low |
| **IT Approval Needed** | No | Possibly | No |
| **Accuracy** | Good | Excellent | Perfect (human-written) |
| **Maintenance** | Medium | High | Very Low |
| **Long-term Viability** | Poor (credits expiring) | Good if licensed | Excellent |

## 4. Recommendation
**Build Option C now.** It perfectly fits the current constraints (no premium licenses, standard connectors only) and delivers immediate value safely and reliably. 

If the business ever approves a Premium Power Automate license in the future, Option B becomes the clear upgrade path for implementing true AI generation.

## 5. Implementation Timeline
- Option C can be fully built and tested in **1-2 days**.
- There are no known blockers to starting this implementation immediately.
