# Phase 2: AI Automation Strategy for Apollo Green Solutions
## Claude Projects, Skills, and MCP Integrations

**Prepared for:** Apollo Green Solutions — Alexandra & Team  
**Prepared by:** Ümmügülsün Türkmen  
**Date:** July 2026

---

## Overview

This document outlines a practical AI automation strategy for Apollo Green Solutions using Claude Enterprise. It covers three categories:

1. **Projects** — Permanent AI workspaces with company-specific context
2. **Skills** — Reusable one-click automation tools for the team
3. **MCP Integrations** — Direct connections to external tools (Canva, Gamma, DeepL, Figma)

Each proposal includes the setup requirements, a concrete use case, and the expected business impact.

---

## 1. Claude Projects: 3 Proposals

*Projects allow us to upload permanent files (templates, pricing sheets, regulations) and set behavioral rules once. Claude remembers this context across every conversation inside the project — no re-uploading, no repeated instructions.*

---

### 📋 Project A: Client Proposal Generator

| | |
|---|---|
| **Goal** | Automate the drafting of client proposals |
| **Setup Time** | ~30 minutes (one-time) |
| **Time Saved** | 2–3 hours per proposal |

**Context Files to Upload:**
- Apollo's standard proposal template (Word/PDF)
- Current pricing sheet
- 2–3 past winning proposals as reference
- Company capabilities one-pager

**Project Instructions:**
> *"You are Apollo's Senior Sales Consultant. When a client inquiry or RFP summary is pasted, draft a tailored proposal using our template structure. Always include: a personalized executive summary referencing the client's industry and pain points, a scope of work with 3–5 deliverables, and a pricing table from the uploaded pricing sheet."*

**Use Case:** A sales rep receives an inquiry from a facility manager asking about energy optimization. They paste the email into the project. Claude cross-references the pricing sheet and past proposals, then outputs a ready-to-send proposal — personalized to the client's industry and facility size. What normally takes 2–3 hours is completed in under 2 minutes.

---

### 📋 Project B: Regulatory & Compliance Assistant

| | |
|---|---|
| **Goal** | Provide instant, cited regulatory guidance |
| **Setup Time** | ~1 hour (one-time) |
| **Time Saved** | 30–60 minutes per query |

**Context Files to Upload:**
- Key EU energy directives (EPBD recast)
- German GEG (Gebäudeenergiegesetz) summary
- Relevant ISO standards (ISO 50001)
- Apollo's internal compliance checklist

**Project Instructions:**
> *"You are Apollo's Regulatory Compliance Specialist. When asked about a regulation, building type, or scenario, provide guidance based on the uploaded documents. Always cite the specific article or section. Flag upcoming regulatory deadlines."*

**Use Case:** A consultant preparing an energy audit asks: *"Does this building need to comply with EPBD solar-readiness by 2027?"* Claude checks the uploaded directives and returns a specific, cited answer with the exact deadline and required actions. No more searching through 200-page PDF documents.

---

### 📋 Project C: CRM Pipeline Intelligence

| | |
|---|---|
| **Goal** | Transform raw CRM data into weekly actionable insights |
| **Setup Time** | ~30 minutes (one-time) |
| **Time Saved** | 1–2 hours per week |

**Context Files to Upload:**
- Monthly CRM export (CSV)
- Apollo's lead scoring criteria (company size, target industries, budget thresholds)
- Active deals list with current pipeline stages

**Project Instructions:**
> *"You are Apollo's CRM Analyst. When a CRM export is uploaded: (1) Identify and merge duplicate contacts, (2) Flag stale leads with no activity for 60+ days, (3) Score all leads as Hot / Warm / Cold based on the uploaded criteria, (4) Generate a pipeline summary with total deal value by stage, (5) Recommend the top 5 leads to prioritize this week with a one-sentence rationale for each."*

**Use Case:** Every Monday, the sales manager uploads the latest CRM export. Claude instantly produces a pipeline health report: stale deals needing follow-up, hot leads matching the ideal client profile, and duplicate entries to merge. This can be further automated with **Scheduled Tasks** to run every Monday at 9:00 AM — completely hands-free.

---

## 2. Claude Skills: 3 Proposals

*Skills are reusable, one-click automation tools. Once created, any team member can run them without writing a single prompt. Skills can be shared across the entire Apollo workspace with one click.*

> **💡 Best Practice:** Do not write Skills from scratch. Have a natural conversation with Claude first, refine the output until it's exactly right, and then say *"Can you turn this into a Skill?"* Claude packages the entire workflow automatically. This produces significantly better results than writing the instructions manually.

---

### ⚡ Skill A: Tender Document Analyzer

| | |
|---|---|
| **Input** | Upload a tender/RFP document (PDF, 30–80 pages) |
| **Output** | Structured checklist table |
| **Time Saved** | 1–2 hours per document |

**What it extracts:**
- Submission deadline
- Mandatory requirements (numbered list)
- Evaluation criteria with weightings
- Required certifications
- Disqualifying conditions

**Output Format:** Checklist table — Requirement | Status (Met / Not Met / Needs Review) | Notes

**Business Impact:** Energy sector tender documents are dense and lengthy. Missing a single requirement can disqualify a bid worth thousands of euros. This Skill ensures nothing gets overlooked — in 30 seconds instead of 2 hours.

---

### ⚡ Skill B: Technical Report → Executive Brief

| | |
|---|---|
| **Input** | Upload a technical report (energy audit, feasibility study, grid analysis) |
| **Output** | One-page executive brief |
| **Time Saved** | 30–60 minutes per report |

**What it produces:**
- 3-sentence summary
- Key metrics table (energy consumption, cost, CO₂ emissions, savings potential)
- Top 3 risks or red flags
- 3 recommended next steps

**Business Impact:** Engineers produce 50-page reports that executives rarely read in full. This Skill bridges the gap — critical insights reach decision-makers instead of getting buried in lengthy technical documents.

---

### ⚡ Skill C: Client Follow-Up Email Generator

| | |
|---|---|
| **Input** | Paste rough meeting notes (or dictate via voice input) |
| **Output** | Professional follow-up email (German or English) |
| **Time Saved** | 15–30 minutes per email |

**What it produces:**
- Professional email with subject line
- Discussion summary with key points
- Confirmed next steps with specific dates
- Open questions requiring client response
- Automatic language detection (German or English)

**Business Impact:** The gap between a productive client meeting and the follow-up email is where deals stall. Most consultants take 1–2 days to send follow-ups. This Skill produces a ready-to-send email in 10 seconds, while the meeting is still fresh.

---

## 3. MCP Integrations (Model Context Protocol)

### What is MCP?

MCP is an open standard that lets Claude connect directly to external tools — without manually downloading and re-uploading files. Claude reaches into the tool, performs the work, and returns the result. All within a single conversation.

**🔒 Security:** Every connector has granular permission controls:
- **Always Allow** — for read-only operations (e.g., fetching data)
- **Needs Approval** — Claude asks before performing the action
- **Blocked** — Claude can never perform that action

This gives the team full control over what the AI can and cannot do with each connected tool.

---

### 🖼️ Canva — Presentations & Marketing

| | |
|---|---|
| **Setup** | Official connector, one-click in Claude's settings |
| **Use Cases** | Client pitch decks, LinkedIn visuals, marketing materials |

**Sales Workflow:** After Claude generates a client proposal in Project A, a sales rep says: *"Create a 5-slide pitch deck using our Apollo template."* Claude connects to Canva, populates the branded template with key data points, and returns a shareable link — ready for the client meeting.

**Marketing Workflow:** Claude writes LinkedIn post copy AND generates on-brand visuals in Canva — without involving a designer.

---

### 📊 Gamma — Automated Reporting & Presentations

| | |
|---|---|
| **Setup** | MCP connector |
| **Use Cases** | Weekly reports, pipeline summaries, automated presentations |

**Workflow:** Claude analyzes data → creates a summary document → converts it into a Gamma presentation with charts → sends the link. This entire chain can run as a **Scheduled Task** (e.g., every Friday at 5:00 PM) for automatic weekly reporting — completely hands-free.

**vs PowerPoint:** Gamma produces modern, web-based presentations instantly. Claude can also generate PowerPoint files directly if the team prefers traditional formats.

---

### 🌍 DeepL — Precision Translation

| | |
|---|---|
| **Setup** | API integration |
| **Use Cases** | RFP translation, brochure localization, formal correspondence |

**Why DeepL over Claude's built-in translation?** Claude translates well for general text, but DeepL via MCP ensures industry-specific terminology — energy regulations (GEG, EPBD, EnEV), engineering terms, and legal language — is translated with maximum precision.

**Sales Workflow:** Receive a technical RFP in German → Claude translates via DeepL with correct terminology → team drafts response in English → Claude translates the final proposal back to formal German. Entire cycle in one conversation.

**International Expansion:** Translate company brochures, case studies, and standard proposals into Turkish with correct energy sector terminology — creating market-ready materials in hours instead of weeks.

---

### 🎨 Figma — Design & Process Documentation

| | |
|---|---|
| **Setup** | MCP connector |
| **Use Cases** | Workflow documentation, process specs, onboarding checklists |

**Workflow:** When redesigning internal workflows (CRM pipeline, client onboarding process), Claude reads Figma mockups and automatically generates step-by-step process documentation, FAQs, and implementation checklists.

**Business Impact:** Eliminates hours of manual specification writing when translating visual designs into actionable team documentation.

---

## 4. Scheduled Tasks — The Automation Calendar

*Once any workflow produces the desired output, it can be automated to run on a recurring schedule. Simply say: "Schedule this to run every Monday at 9:00 AM" — Claude creates the task and executes it automatically in the background, using all connected tools.*

### Proposed Weekly Automation Schedule

| Day & Time | Automated Task | Output | Connected Tools |
|---|---|---|---|
| **Monday 9:00 AM** | CRM Pipeline Analysis | Pipeline summary with lead scoring | CRM Data → Claude |
| **Wednesday 9:00 AM** | Regulatory Update Scan | Flag new EU energy directive changes | Claude → Team Channel |
| **Friday 5:00 PM** | Weekly Activity Report | Formatted presentation with KPIs | Claude → Gamma → Team |

---

## Next Steps

1. **Receive Claude Enterprise credentials** and configure the workspace
2. **Build Project A (Proposal Generator)** as a pilot — quickest win with highest impact
3. **Connect Canva** as the first MCP integration — solves the presentation need immediately
4. **Create the first Skill** (Follow-Up Email Generator) using the conversation-first approach
5. **Evaluate results** after 1–2 weeks and expand to remaining proposals
