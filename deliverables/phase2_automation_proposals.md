# Phase 2: Claude Projects, Skills, and MCP Integrations
**Prepared for: Apollo Green Solutions — Alexandra & Team**

---

## 1. Claude Projects: 3 Concrete Examples

*Projects allow us to upload permanent files and set rules once. Claude remembers everything for every future conversation inside that project.*

### Example A: Client Proposal Generator
* **Context (Files):** Apollo's standard proposal template, current pricing sheet, 2-3 past winning proposals, and a company capabilities one-pager.
* **Instructions:** "You are Apollo's Senior Sales Consultant. When a client inquiry or RFP summary is pasted, draft a tailored proposal using our template structure. Always include: a personalized executive summary referencing the client's industry and pain points, a scope of work with 3-5 deliverables, and a pricing table from the uploaded pricing sheet."
* **Use Case:** A sales rep receives an inquiry from a facility manager asking about energy optimization. They paste the email in. Claude cross-references our pricing and past proposals, and outputs a ready-to-send proposal personalized to the client's industry and facility. What normally takes 2-3 hours is done in 2 minutes.
* **Why it matters:** Proposal writing is one of the biggest time sinks in consulting sales. This project alone could save the sales team 5-10 hours per week.

### Example B: Regulatory & Compliance Assistant
* **Context (Files):** Key EU energy directives (EPBD recast), German GEG (Gebäudeenergiegesetz), relevant ISO standards (ISO 50001), and Apollo's internal compliance checklist.
* **Instructions:** "You are Apollo's Regulatory Compliance Specialist. When asked about a regulation, building type, or scenario, provide guidance based on the uploaded documents. Always cite the specific article or section. Flag upcoming deadlines."
* **Use Case:** A consultant preparing an audit asks: "Does this building need to comply with EPBD solar-readiness by 2027?" Claude checks the directives and gives a cited answer with the exact deadline and required actions. No more searching through 200-page PDFs.
* **Why it matters:** Instant, cited regulatory answers—without manual research—is a genuine competitive advantage for an energy consultancy.

### Example C: CRM Pipeline Intelligence
* **Context (Files):** Monthly CRM export (CSV), Apollo's lead scoring criteria, and active deals list.
* **Instructions:** "You are Apollo's CRM Analyst. When a CRM export is uploaded: (1) Identify and merge duplicate contacts, (2) Flag stale leads (60+ days inactive), (3) Score leads as Hot/Warm/Cold based on the uploaded criteria, (4) Generate a pipeline summary with total deal value by stage, (5) Recommend the top 5 leads to prioritize this week with a one-sentence rationale for each."
* **Use Case:** Every Monday, the sales manager uploads the CRM export. Claude produces a pipeline health report: stale deals needing follow-up, hot leads matching our ideal profile, duplicates to merge. This can be further automated with **Scheduled Tasks** to run every Monday at 9 AM without anyone lifting a finger.
* **Why it matters:** Turns a messy spreadsheet into weekly actionable intelligence—like having a dedicated data analyst for CRM.

---

## 2. Claude Skills (Custom One-Click Tools): 3 Concrete Examples

*Skills are reusable, one-click automations. No long prompts needed.*

> **Best Practice:** Do not create Skills from scratch. Have a conversation with Claude first, get the output you want, and then say "Can you turn this into a Skill?" Claude packages the entire workflow automatically—much better results than writing instructions manually. Skills can be shared across the entire team with one click.

### Skill A: "RFP Requirement Extractor"
* **What it does:** Upload an RFP document. The Skill extracts: submission deadline, mandatory requirements (numbered list), evaluation criteria with weightings, required certifications, and disqualifying conditions.
* **Output:** Checklist table — Requirement | Status (Met / Not Met / Needs Review) | Notes.
* **Why it matters:** Energy sector RFPs are 30-80 pages of dense language. This does in 30 seconds what takes 1-2 hours manually, and nothing gets overlooked.

### Skill B: "Technical Report → Executive Brief"
* **What it does:** Upload a long technical report (audit, feasibility study, grid analysis). Outputs a one-page executive brief: 3-sentence summary, key metrics table (consumption, cost, CO₂, savings), top 3 risks, and 3 next steps.
* **Why it matters:** Engineers write 50-page reports that executives never read in full. This bridges the gap—critical insights reach decision-makers instead of getting buried.

### Skill C: "Client Follow-Up Email Generator"
* **What it does:** Paste messy meeting notes (or dictate them via voice input). Outputs a professional follow-up email with discussion summary, confirmed next steps with dates, and open questions—in German or English.
* **Why it matters:** The gap between a meeting and the follow-up email is where deals die. This closes it in 10 seconds while the meeting is still fresh.

---

## 3. APIs and MCPs (Model Context Protocol)

### What is MCP?
MCP is an open standard that lets Claude connect directly to external tools—without manually downloading and re-uploading files. Claude reaches into the tool, does the work, and returns the result.

Every connector has granular permission controls: **Always Allow** (for reading), **Needs Approval** (Claude asks first), or **Blocked** (never allowed). Full control over what the AI can and cannot do.

### High-Value Integrations for Apollo:

#### 🖼️ Canva (Presentations & Marketing)
* **Setup:** Official connector, one-click in Claude's settings.
* **Sales workflow:** After Claude generates a proposal, say "Create a pitch deck using our Apollo template." Claude connects to Canva, populates branded slides, returns a shareable link.
* **Marketing:** Claude writes LinkedIn copy AND generates on-brand visuals—no designer needed.

#### 📊 Gamma (Automated Presentations)
* **What it is:** A modern presentation tool that connects to Claude via MCP.
* **Workflow:** Claude analyzes data → creates a summary document → converts it into a Gamma presentation with charts → sends the link. This entire chain can run as a **Scheduled Task** (e.g., every Friday at 5 PM) for automatic weekly reporting.
* **vs PowerPoint:** Gamma produces web-based presentations instantly. Claude can also generate PowerPoint files directly if the team prefers.

#### 🌍 DeepL (Precision Translation)
* **Why not just Claude?** Claude translates well, but DeepL via MCP ensures industry-specific terminology—energy regulations (GEG, EPBD, EnEV), engineering terms, legal language—is translated with maximum precision.
* **Sales:** Receive a technical RFP in German → Claude translates via DeepL → team drafts response in English → Claude translates back to formal German. Entire cycle in one chat.
* **Expansion:** Translate brochures and case studies into Turkish with correct energy sector terminology—market-ready materials in hours.

#### 🎨 Figma (Design & Process Workflows)
* **Use Case:** When redesigning internal workflows (CRM pipeline, client onboarding process), Claude reads Figma mockups and automatically generates step-by-step process documentation, FAQs, and implementation checklists.
* **Why it matters:** Eliminates hours of manual spec-writing when translating visual designs into actionable team documentation.

---

## 4. Scheduled Tasks — Bringing It All Together

*Once a workflow works, you can automate it to run on a recurring schedule. Say "Schedule this to run every Monday at 9 AM" and Claude handles the rest.*

| Day | Task | Output |
|---|---|---|
| **Monday 9 AM** | CRM Pipeline Analysis | Summary posted to sales channel |
| **Friday 5 PM** | Weekly Activity Report | Gamma presentation sent to management |
