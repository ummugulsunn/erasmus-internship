# Claude Enterprise: Complete Feature Guide & Use Cases for Apollo Green Solutions

**Prepared by:** Ümmügülsün Türkmen  
**Date:** July 3, 2026  
**Target Audience:** Alexandra Xanthopoulos, Apollo Green Solutions  
**Status:** Draft / Pending Review

---

## Table of Contents

1. [Platform Overview — Chat, Cowork & Code](#1-platform-overview--the-three-tabs)
2. [The Chat Input Bar — Controls & Features](#2-the-chat-input-bar--controls--features)
3. [Projects — Full Capabilities](#3-projects--full-capabilities)
4. [Artifacts — Interactive Outputs](#4-artifacts--interactive-outputs)
5. [Skills — Reusable Workflows](#5-skills--reusable-workflows)
6. [Connectors — Third-Party Integrations](#6-connectors--third-party-integrations)
7. [Plugins — Extended Capabilities](#7-plugins--extended-capabilities)
8. [Model Selection — Understanding Claude's Models](#8-model-selection--understanding-claudes-models)
9. [Memory & Context Window](#9-memory--context-window)
10. [GDPR & Data Privacy Recap](#10-gdpr--data-privacy-recap)
11. [Enterprise Admin Panel](#11-enterprise-admin-panel)
12. [Cowork — Deep Dive (Phase 2 Preview)](#12-cowork--deep-dive-phase-2-preview)
13. [Keyboard Shortcuts & Productivity Tips](#13-keyboard-shortcuts--productivity-tips)
14. [Summary: Feature-to-Apollo Value Map](#14-summary-feature-to-apollo-value-map)
15. [Recommended Implementation Roadmap](#15-recommended-implementation-roadmap)

---

## 1. Platform Overview — The Three Tabs

When you open Claude, you see three tabs at the top of the interface:

| Tab | Purpose | When to Use |
|:---|:---|:---|
| **Chat** | Standard conversational AI interface. Ask questions, generate content, analyze documents, brainstorm ideas. | Day-to-day tasks: writing emails, analyzing data, generating reports. |
| **Cowork** | Background AI assistant that operates autonomously on your desktop. Reads local files, browses the web, executes multi-step tasks without constant supervision. | Complex, multi-step tasks: researching competitors, compiling reports from multiple sources, processing batches of documents. |
| **Code** | Specialized coding environment with syntax highlighting, code execution, and debugging tools. | Software development tasks: writing scripts, debugging code, building prototypes. |

### The Left Sidebar

| Element | Description |
|:---|:---|
| **🔍 Search** | The magnifying glass icon at the very top of the sidebar. Search across all past conversations, projects, and artifacts by keyword. Useful for finding a specific client discussion or an old analysis without scrolling. |
| **New Chat** | Start a fresh conversation (not inside any project). |
| **Projects** | Access all project workspaces. |
| **Artifacts** | Browse all previously generated artifacts across conversations. |
| **Customize** | Access Skills, Connectors, and Plugins settings. |
| **Recents** | Scrollable list of recent conversations. Chats are auto-titled based on content. You can rename any chat by right-clicking it. |

### Quick Action Buttons (Below the Chat Input)

When you open a new chat, you'll see shortcut buttons below the input box that help you start common tasks instantly:

| Button | What It Does |
|:---|:---|
| **✏️ Write** | Starts a writing-focused session. Optimized prompts for drafting emails, reports, articles, or creative content. |
| **📚 Learn** | Starts an educational session. Explains concepts, breaks down complex topics, answers questions in a teaching style. |
| **</> Code** | Starts a coding session. Optimized for writing, debugging, and explaining code. |
| **🏠 Life stuff** | General personal assistance: planning trips, recipes, recommendations, life advice. |
| **💎 Claude's choice** | Claude picks the best approach based on your first message. Good when you're unsure which mode to use. |

> These buttons are convenience shortcuts — they pre-fill a system context for the conversation. You can always just type your question directly in the input box without using them.

---

## 2. The Chat Input Bar — Controls & Features

The chat input bar is the main interface element you interact with. It contains several controls beyond just typing:

### Input Bar Elements

| Element | Location | What It Does |
|:---|:---|:---|
| **Text Input** | Center | Type your message or prompt here. Supports multi-line input (Shift+Enter for new line). |
| **+ (Attach File)** | Bottom left | Attach files directly to a single message. Unlike Project Files (which persist across all chats), these are one-time attachments for the current conversation only. Supports: images, PDFs, text files, code files, CSVs. |
| **Model Selector** | Bottom right | Dropdown showing the current model (e.g., "Sonnet 5 Medium"). Click to switch models mid-conversation. |
| **🎙️ Voice Input** | Bottom right | Click to dictate your message by voice instead of typing. Claude transcribes your speech into text. Useful for long descriptions or when you prefer speaking. |
| **🔊 Audio Mode** | Bottom right | Toggle real-time voice conversation mode. Talk to Claude naturally and hear spoken responses back. |

### File Attachment vs Project Files — Key Difference

| Feature | Attach via + Button | Project Files |
|:---|:---|:---|
| **Scope** | Only available in the current chat. | Available in ALL chats within the project. |
| **Persistence** | Temporary — gone when you start a new chat. | Permanent — stays until you remove it. |
| **Best for** | Quick, one-off analysis ("analyze this screenshot"). | Persistent reference materials (brand guidelines, templates, SOPs). |

## 3. Projects — Full Capabilities

### What It Is
Projects are self-contained workspaces within Claude that isolate conversations, files, and instructions under one roof. Every chat started inside a project automatically inherits its instructions and has access to its uploaded files.

### Core Capabilities

| Capability | Description |
|:---|:---|
| **Project Instructions** | Custom rules that apply to every conversation in the project. Acts as a persistent "role" for Claude. These are set via the pencil (✏️) icon next to the "Instructions" section inside a project. |
| **Project Files** | Upload PDFs, text files, spreadsheets, code, or images via the "+" button in the "Files" section. Claude references these across all chats in the project. Supported formats: PDF, TXT, CSV, MD, DOCX, images (PNG, JPG). |
| **Chat History** | Each project maintains its own conversation history, keeping topics organized and searchable. Old chats are preserved and can be revisited. |
| **Multiple Chats** | You can have multiple simultaneous chats within one project — each one is a separate conversation thread but shares the same files and instructions. |
| **Starred Projects** | Pin frequently used projects to the top of the sidebar for quick access. Click the star icon (☆) on the project page. |

### Team Sharing (Enterprise Feature)

This is how project sharing works on the Enterprise plan:

| Sharing Option | What It Does |
|:---|:---|
| **Private (Default)** | Only you can see the project. No one else in the workspace has access. |
| **Share with Specific People** | Invite individual team members by email. You can assign **Viewer** (read-only) or **Editor** (can add files, modify instructions, start chats) roles. |
| **Share with Entire Workspace** | Make the project visible to all team members in the organization's Claude workspace. Useful for company-wide knowledge bases. |
| **Permission Levels** | **Viewer:** Can read instructions, view files, and read chat history. **Editor:** Can modify instructions, upload files, and start new chats. **Admin:** Full control including sharing settings and deletion. |

> **How to share:** Open a project → click the three-dot menu (⋮) in the top right → select "Share" → add team members by email or toggle workspace visibility.

### Use Cases for Apollo Green Solutions

1. **HR Candidate Evaluation Hub**
   - Upload all candidate surveys and CVs (anonymized) into a single project.
   - Set instructions: *"You are an HR evaluator. Score each candidate on a scale of 1-10 based on technical skills, cultural fit, and energy sector experience. Output as a comparison table."*
   - Ask Claude to compare candidates, generate shortlists, or draft interview questions tailored to each profile.
   - **Team sharing:** Share with the HR team as Editors so they can upload new CVs and run evaluations independently.

2. **Client Energy Audit Workspace**
   - Create one project per client (e.g., *"Samsung Germany — Energy Audit Q3"*).
   - Upload the client's energy consumption data, building specs, and previous audit reports.
   - Set instructions: *"You are an energy management consultant. Always reference ISO 50001 standards and output recommendations in a numbered action list with estimated cost savings."*
   - Generate audit reports, identify savings opportunities, and draft client presentations — all within one isolated, secure workspace.
   - **Team sharing:** Share with the assigned consultant as Editor, share with Alexandra as Viewer for oversight.

3. **Marketing & Proposals Project**
   - Upload Apollo's brand guidelines, tone guide, and past proposal templates.
   - Set instructions: *"Write all content in Apollo Green Solutions' professional tone. Use data-driven arguments and focus on ROI for the client."*
   - Generate client proposals, LinkedIn posts, email campaigns, and pitch decks that consistently match the company voice.

4. **Internal Knowledge Base**
   - Upload SOPs (Standard Operating Procedures), onboarding documents, and company policies.
   - **Share with entire workspace** so any team member can start a chat and ask: *"What is our policy on remote work?"* or *"How do I submit an expense report?"*
   - Claude answers instantly from the uploaded documents — no need to search through folders.

5. **Compliance & Legal Reference**
   - Upload GDPR guidelines, data processing agreements, and internal compliance checklists.
   - Set instructions: *"You are a compliance advisor. Answer questions strictly based on the uploaded documents. If the answer is not in the documents, say so."*
   - Team members can quickly verify compliance questions without waiting for the legal department.

---

## 4. Artifacts — Interactive Outputs

### What It Is
Artifacts are standalone, interactive outputs that Claude creates in a dedicated side panel alongside the conversation. Instead of just giving you text in the chat, Claude can generate fully rendered documents, dashboards, diagrams, and code previews that you can interact with, edit, and download.

### Where to Find Them
- **During a conversation:** Artifacts appear in the right-side panel next to the chat.
- **Artifacts Library:** Click "Artifacts" in the left sidebar to browse all previously generated artifacts across conversations.

### Core Capabilities

| Capability | Description |
|:---|:---|
| **Document Creation** | Generate full reports, guides, memos, or structured documents. Rendered in real-time with proper formatting. |
| **Interactive Dashboards** | Create data visualizations, charts, and interactive HTML dashboards with CSS styling and JavaScript interactivity. |
| **Code Previews** | Write and preview code (HTML, CSS, JS, React, Python) with live rendering. See the output immediately. |
| **Flowcharts & Diagrams** | Generate Mermaid diagrams, process flows, organizational charts, and architecture diagrams. |
| **SVG Graphics** | Create vector graphics, logos, icons, and simple illustrations. |
| **Spreadsheet/Table Views** | Generate structured data in table format that can be copied to Excel or Google Sheets. |
| **Iterative Editing** | Tell Claude to modify specific sections ("make the title bigger," "add a pie chart") without regenerating the entire artifact. |
| **Version History** | Each edit creates a new version. Navigate between versions using the arrow buttons. |
| **Download & Export** | Download artifacts as files to your computer. Formats depend on the artifact type (HTML, SVG, MD, etc.). |
| **Copy to Clipboard** | One-click copy of the artifact content for pasting into other tools. |

### Use Cases for Apollo Green Solutions

1. **Energy Savings Dashboard**
   - Upload a client's monthly energy consumption CSV.
   - Ask Claude: *"Create an interactive dashboard showing energy usage trends, peak hours, and estimated savings if we reduce consumption by 15%."*
   - Claude generates a live HTML dashboard artifact with charts and graphs that Alexandra can present to the client or download.

2. **Client Onboarding Flowchart**
   - Ask Claude: *"Create a flowchart of our client onboarding process from initial contact to signed contract."*
   - Claude generates a Mermaid diagram artifact showing each step, decision point, and responsible team member.
   - Edit it iteratively: *"Add a step for compliance review between proposal and contract."*

3. **Proposal Document Generation**
   - Ask Claude to generate a full energy management proposal as a structured document artifact.
   - Iterate on sections (executive summary, technical approach, pricing) through conversation.
   - Download the final version to share with the client.

4. **Meeting Summary & Action Items**
   - After a meeting, paste your notes and ask Claude to create a structured artifact with: Summary, Key Decisions, Action Items (with owners and deadlines).
   - Download and share with the team.

5. **Organizational Charts**
   - Ask Claude: *"Create an org chart for Apollo Green Solutions with the following team structure..."*
   - Claude generates an SVG or Mermaid diagram showing reporting lines, departments, and roles.

---

## 5. Skills — Reusable Workflows

### What It Is
Skills are preset workflows that Claude pulls in automatically whenever they are relevant. They are "expertise packages" that teach Claude how to complete specific tasks in a repeatable way. Once created, Claude invokes them without manual triggering — it recognizes when a skill applies to the current conversation.

### Where to Find Them
**Customize > Skills** in the left sidebar. You'll see a list of all created skills with their name, last updated date, and author.

### Three Ways to Create Skills (Step-by-Step)

#### Method 1: Create with Claude (Easiest — Recommended)
This is the best option for non-technical users.

**Step-by-step process:**
1. Click **Customize > Skills** in the left sidebar.
2. Click the **Add** button (top right).
3. Select **"Create with Claude"**.
4. A special chat opens where Claude acts as a skill-building assistant.
5. Claude asks you a series of questions:
   - *"What task do you want me to help with?"*
   - *"Can you describe the steps you usually follow?"*
   - *"What format should the output be in?"*
   - *"Are there any rules or constraints I should follow?"*
6. Based on your answers, Claude automatically writes the skill instructions.
7. Review the generated skill and click **Save**.
8. The skill is now active — Claude will automatically apply it when relevant.

**Example conversation:**
> **Claude:** "What task do you want me to help with?"  
> **You:** "I want you to format energy audit reports."  
> **Claude:** "Can you describe the structure?"  
> **You:** "Executive summary, key findings as bullet points, recommendations in a numbered list, and a cost savings table at the end."  
> **Claude:** "Got it. Here's your skill..." *(generates the skill automatically)*

#### Method 2: Write Skill Instructions (Manual Control)
For users who know exactly what they want.

**Step-by-step process:**
1. Click **Customize > Skills** → **Add** → **"Write skill instructions"**.
2. A text editor opens where you write the instructions manually.
3. Write clear, specific rules. Example:
   ```
   # Energy Report Formatter
   
   When the user provides raw energy consumption data:
   1. Create an executive summary (3-4 sentences)
   2. List key findings as bullet points
   3. Generate a recommendations section as a numbered list
   4. Include a cost savings table with columns: Action, Estimated Savings (€), Timeline
   5. Always use Apollo Green Solutions branding language
   6. End with "Next Steps" section
   ```
4. Save the skill.

#### Method 3: Upload a Skill (Import)
For sharing skills across teams or importing pre-built skills.

**Step-by-step process:**
1. Click **Customize > Skills** → **Add** → **"Upload a skill"**.
2. Select a skill file from your computer (typically a `.md` or `.txt` file with skill instructions).
3. The skill is imported and activated immediately.

**When to use:** When a colleague has created a useful skill and wants to share it with the team. They export/download their skill file, send it to you, and you upload it.

### How Skills Differ from Project Instructions

| Aspect | Project Instructions | Skills |
|:---|:---|:---|
| **Scope** | Apply only inside one specific project. | Apply across ALL conversations, globally. |
| **Trigger** | Always active in that project. | Automatically activated when Claude detects relevance. |
| **Location** | Set inside each project's settings. | Set under Customize > Skills. |
| **Best for** | Project-specific roles (e.g., "HR evaluator for this project"). | Reusable workflows (e.g., "always format reports this way"). |

### Use Cases for Apollo Green Solutions

1. **Energy Report Formatter Skill**
   - Trigger: Anytime someone pastes energy consumption data and asks for a report.
   - Output: A formatted report matching Apollo's standard template with executive summary, findings, and cost savings table.

2. **Client Email Drafter Skill**
   - Trigger: When someone asks Claude to draft a client email.
   - Output: A polished email in Apollo's professional tone, with appropriate greeting, structured body, and sign-off.

3. **LinkedIn Post Creator Skill**
   - Trigger: When someone asks to create a social media post.
   - Output: An engaging LinkedIn post with relevant hashtags (#EnergyTransition #AIforAll), mentions, and a call to action.

4. **Invoice/Quote Generator Skill**
   - Trigger: When someone provides project details and asks for a quote.
   - Output: A formatted quote document with client name, service lines, pricing, and terms.

5. **Meeting Notes Formatter Skill**
   - Trigger: When raw meeting notes are pasted.
   - Output: Structured document with Summary, Decisions, Action Items (owner + deadline), and Next Meeting agenda.

---

## 6. Connectors — Third-Party Integrations

### What It Is
Connectors allow Claude to access external applications to read information and perform actions. Once connected, Claude can search files, retrieve documents, analyze data, and execute tasks across connected apps — all from within the conversation.

### Where to Find Them
**Customize > Connectors** in the left sidebar. The page shows:
- **Popular (top):** Quick-connect buttons for Gmail, Google Drive, and Slack.
- **Full list (below):** All available connectors with their type (Web/Desktop) and connection status (✓ connected / "Connect" button).

### How to Connect (One-Time Setup)
1. Click **Customize > Connectors**.
2. Find the app you want to connect (e.g., Google Drive).
3. Click **"Connect"**.
4. A login/authorization window opens for that service.
5. Grant Claude the necessary permissions (read-only or read-write depending on the connector).
6. Once connected, the status changes to ✓.
7. Claude can now access that app's data in any conversation.

### Available Connectors Relevant to Apollo

| Connector | Type | What It Does for Apollo |
|:---|:---|:---|
| **Google Drive** | Web | Pull energy reports, client contracts, and shared documents directly into Claude conversations. Ask Claude to summarize, compare, or analyze files without downloading them first. |
| **Gmail** | Web | Search and retrieve emails. Ask Claude to draft replies, summarize email threads, or extract action items from client correspondence. |
| **Slack** | Web | Pull messages from project channels. Ask Claude to summarize team discussions, extract decisions, or draft announcements. |
| **Figma** | Web | Pull design files and prototypes. Claude can analyze layouts, suggest copy improvements, or extract specifications. |
| **HubSpot** | Web | Access CRM data — client records, deal pipelines, contact history. Generate sales reports and draft follow-up emails. |
| **GitHub** | Web | Pull code repositories, issues, and documentation. Claude can review code, explain changes, or help debug issues. |
| **Notion** | Web | Access team wikis, project boards, and documentation. Claude can search across Notion pages to answer questions about processes or projects. |
| **Linear** | Web | Access project management boards, issues, and sprint data. Claude can summarize sprint progress or draft issue descriptions. |
| **Filesystem** | Desktop | Access local files on your computer. Claude can read, analyze, and reference documents stored locally. |

### How Connecting Figma Helps Apollo (Alexandra's Question)
Figma is primarily a design tool, but connecting it to Claude adds a powerful AI layer:

| Use Case | How It Works |
|:---|:---|
| **Copy Review** | Claude reads the text content in Figma mockups and suggests improvements for clarity, tone, or GDPR compliance. |
| **Design-to-Content Pipeline** | Share a landing page mockup from Figma → ask Claude to write the actual copy for each section based on the visual layout. |
| **Presentation Feedback** | Share pitch deck designs → ask Claude to critique the flow, suggest better data visualizations, or rewrite slide copy. |
| **Accessibility Audit** | Claude analyzes Figma designs and flags potential accessibility issues (contrast, text size, alt text). |
| **Design Brief Generation** | Describe what you need to a designer → Claude generates a structured design brief referencing existing Figma components. |

### How Connecting Canva Helps Apollo

| Use Case | How It Works |
|:---|:---|
| **Template Consistency** | Claude reviews Canva designs against Apollo's brand guidelines and flags inconsistencies in colors, fonts, or tone. |
| **Content Generation** | Describe what you need → Claude suggests Canva template types and writes the text content to paste into them. |
| **Social Media Workflow** | Claude writes the LinkedIn post (via the LinkedIn Post Creator skill) → you design the visual in Canva → seamless end-to-end workflow. |
| **Batch Content** | Need 10 social media posts for the month? Claude generates all the copy at once, matched to your Canva template sizes. |

### How Connecting HubSpot Helps Apollo

| Use Case | How It Works |
|:---|:---|
| **Sales Intelligence** | Ask Claude: *"Which deals in HubSpot have been stuck in the proposal stage for more than 2 weeks?"* — instant pipeline analysis. |
| **Client Communication** | Pull a client's full interaction history from HubSpot and ask Claude to draft a personalized follow-up email referencing past conversations. |
| **Pipeline Reports** | Generate weekly pipeline summaries and forecasts without manually exporting data. |
| **Lead Scoring** | Ask Claude to analyze new leads against your ideal customer profile and rank them by fit. |
| **Meeting Prep** | Before a client call, ask Claude: *"Summarize everything we know about [Client] from HubSpot."* — instant briefing. |

### Recommended Priority for Apollo

| Priority | Connector | Reason |
|:---|:---|:---|
| 🔴 **Connect First** | Google Drive | Immediate access to all shared company documents without manual uploads. |
| 🔴 **Connect First** | Gmail | Streamline email drafting and summarization for client communication. |
| 🟡 **Connect Second** | HubSpot | Unlock CRM-powered sales intelligence and client insights. |
| 🟡 **Connect Second** | Slack | Centralize team communication summaries. |
| 🟢 **Connect Later** | Figma | Useful for design-content workflow but not urgent for daily operations. |

---

## 7. Plugins — Extended Capabilities

### What It Is
Plugins are additional extensions that expand Claude's built-in functionality. Unlike Connectors (which connect to external data sources), Plugins add new tools and capabilities that Claude can use during conversations.

### Where to Find Them
**Customize > Plugins** in the left sidebar.

### Core Capabilities

| Capability | Description |
|:---|:---|
| **Extended Functionality** | Add specialized tools that Claude can use during conversations (e.g., advanced data analysis, code execution, web browsing). |
| **Third-Party Extensions** | Install plugins created by third-party developers to extend Claude's abilities in specific domains. |
| **Custom Plugins** | Enterprise teams can develop and deploy custom plugins tailored to their specific workflows. |
| **Browse & Install** | Browse available plugins from the marketplace, read descriptions, and install with one click. |

### Potential Use Cases for Apollo
- **Advanced Data Analysis Plugin:** Process large energy consumption datasets with statistical analysis beyond Claude's built-in capabilities.
- **Document Formatting Plugin:** Auto-format outputs into Apollo-branded PDF reports with logos, headers, and footers.
- **Translation Plugin:** Automatically translate client communications between German, Greek, and English — relevant for Apollo's multinational operations (Germany/Greece).
- **Web Research Plugin:** Allow Claude to browse the web in real-time to check current energy prices, regulations, or competitor information.

---

## 8. Model Selection — Understanding Claude's Models

Claude offers multiple AI models accessible via the model selector dropdown in the bottom right of the chat input bar. Choosing the right one optimizes both cost and output quality.

### Available Models

| Model | Strengths | Speed | Cost | When to Use at Apollo |
|:---|:---|:---|:---|:---|
| **Sonnet 5 Mini** | Fastest, most lightweight. Good for simple tasks. | ⚡⚡⚡ Fastest | 💰 Cheapest | Quick lookups, simple reformatting, short Q&A, translating short texts. |
| **Sonnet 5 Medium** | Best balance of speed, intelligence, and cost. The default model. Excellent for writing, analysis, and most daily tasks. | ⚡⚡ Fast | 💰💰 Standard | **Daily use (recommended default):** Email drafting, report formatting, document analysis, social media posts, meeting summaries, data extraction. |
| **Opus 4.6** | Most powerful model. Deepest reasoning, most nuanced writing, handles extreme complexity. | 🐢 Slower | 💰💰💰 Most Expensive | **Complex tasks only:** Multi-document legal analysis, advanced strategic planning, nuanced multi-variable analysis, tasks requiring exceptional depth. |
| **Opus 4.6 (Thinking)** | Opus with Extended Thinking enabled. Takes extra time to reason step-by-step before responding. | 🐢🐢 Slowest | 💰💰💰💰 Highest | **Critical high-stakes work:** Complex compliance reviews, multi-step financial modeling, intricate technical architectures. |

### How to Switch Models
1. Look at the bottom right of the chat input bar — you'll see the current model name (e.g., "Sonnet 5 Medium").
2. Click the dropdown arrow (∨) next to the model name.
3. Select the desired model from the list.
4. The model switch applies immediately to the current conversation.

> **You can switch models mid-conversation.** Start with Sonnet for quick back-and-forth, then switch to Opus for the final, polished output — this saves cost while getting the best result when it matters.

### Extended Thinking Mode
Extended Thinking is a special mode (primarily associated with Opus) where Claude takes extra time to "think through" complex problems internally before generating a response. You can see a "Thinking..." indicator while Claude reasons.

- **When to enable:** Complex analytical tasks, multi-step reasoning, strategy documents, tasks where accuracy is critical.
- **When to skip:** Simple emails, formatting, quick questions — it would just slow things down.
- **How to enable:** Select a model variant with "(Thinking)" in the name from the model selector, or toggle Extended Thinking in the model options.

### Recommendation for Apollo
> Use **Sonnet 5 Medium** as the default for 90% of daily tasks. Use **Sonnet 5 Mini** for trivial tasks (translating a sentence, reformatting a list). Switch to **Opus** only for high-stakes documents (major client proposals, legal compliance reviews, complex data analysis). This optimizes cost while ensuring quality where it matters most.

---

## 9. Memory & Context Window

### Context Window
The context window is the amount of text Claude can "see" and process in a single conversation.

| Feature | Detail |
|:---|:---|
| **Size** | 200,000+ tokens (~150,000 words or ~500 pages of text). |
| **What counts** | Everything in the conversation: your messages, Claude's responses, uploaded files, and project instructions. |
| **Why it matters** | Claude can analyze entire codebases, 100+ page energy audits, or multiple documents simultaneously without losing context. |
| **Comparison** | ChatGPT Free: 8k tokens. ChatGPT Plus: 128k tokens (with performance degradation). Claude: 200k+ tokens with consistent accuracy. |

### Conversation Memory

| Behavior | Description |
|:---|:---|
| **Within a Chat** | Claude remembers everything said in the current conversation. It can reference earlier messages, recall instructions, and maintain context across a long discussion. |
| **Across Chats (Default)** | Claude does NOT carry memory between separate chat sessions unless explicitly set up. Each new chat starts fresh. |
| **Within a Project** | All chats inside a project share the same files and instructions, but chat histories are separate. Starting a new chat in a project resets the conversation while keeping access to project resources. |
| **Memory Feature** | Claude can be configured to remember specific facts across conversations (e.g., "Remember that Apollo's fiscal year starts in April"). This is managed under Settings > Memory. |

### Best Practice for Apollo
> Use **Projects** (not standalone chats) for all work-related conversations. This ensures Claude always has access to the right context, files, and instructions — even when starting a new chat.

---

## 10. GDPR & Data Privacy Recap

*(Full details are in the separate [GDPR & Team Efficiency Guide](https://github.com/ummugulsunn/erasmus-internship/blob/main/deliverables/claude_gdpr_and_team_efficiency_guide.md))*

### Quick Reference

| Protection | Detail |
|:---|:---|
| **Zero Data Retention (ZDR)** | Anthropic does not use Enterprise/Team plan data to train models. |
| **Encryption at Rest** | AES-256 encryption for all stored data. |
| **Encryption in Transit** | TLS 1.2 or higher for all data transmission. |
| **SOC 2 Type II** | Independently audited security controls. |
| **Admin Controls** | Workspace admins can manage users, permissions, and audit logs. |

### When to Anonymize (The Rule)

| Document Type | Anonymize? | Reason |
|:---|:---|:---|
| Resumes / CVs | ✅ Yes | Contains names, addresses, phone numbers (PII). |
| Client contact lists | ✅ Yes | Contains personal contact information. |
| Energy consumption data | ❌ No | Technical data, no personal information. |
| Company templates | ❌ No | Internal operational documents. |
| Brand guidelines | ❌ No | Public-facing design standards. |
| Code / scripts | ❌ No | Technical content without PII. |
| Employee performance reviews | ✅ Yes | Contains personal evaluations and names. |

---

## 11. Enterprise Admin Panel

The Enterprise plan includes a dedicated admin panel for workspace management. This is relevant for Alexandra as the workspace administrator.

### Admin Capabilities

| Capability | Description |
|:---|:---|
| **User Management** | Invite new team members by email, assign roles (Admin, Member, Viewer), deactivate accounts when employees leave. |
| **Workspace Settings** | Configure workspace name, default model, and global policies (e.g., disable certain connectors, enforce data handling rules). |
| **Usage Analytics** | View token consumption per user, per model, and per time period. Identify which team members use Claude most and which models they prefer. Useful for optimizing the subscription plan. |
| **Audit Logs** | Detailed logs of all workspace activity: who logged in, what files were uploaded, which projects were accessed. Critical for GDPR compliance and internal security audits. |
| **SSO / SAML Integration** | Enterprise plans support Single Sign-On via SAML 2.0 (e.g., Google Workspace, Okta, Azure AD). Team members log in with their company credentials — no separate Claude password needed. |
| **Data Retention Policies** | Configure how long conversation data is stored. Set automatic deletion periods for compliance. |
| **API Key Management** | Generate and manage API keys for programmatic access to Claude. Useful if the development team wants to integrate Claude into internal tools or scripts. |
| **Role-Based Access Control (RBAC)** | Define custom roles with specific permissions. For example, create a "Client Consultant" role that can access client projects but cannot modify workspace settings. |

### Relevance for Apollo
- **Alexandra as Admin:** Can control who has access, monitor usage to justify ROI, and maintain GDPR compliance through audit logs.
- **Team Onboarding:** Invite new team members in bulk, assign them to the right projects immediately.
- **Cost Control:** Monitor which models are being used and set guidelines to prevent excessive Opus usage.

---

## 12. Cowork — Deep Dive (Phase 2 Preview)

> **Note:** This section is a preview for Phase 2, starting after Tuesday's review.

### What It Is
Cowork is Claude's autonomous background agent mode. Unlike Chat (where you go back and forth), Cowork operates independently — you give it a task, and it works on it in the background while you do other things. It can read local files on your computer, browse the web, and execute multi-step tasks.

### How It Works
1. Click the **Cowork** tab at the top of the interface.
2. Describe your task in natural language.
3. Claude creates a plan, shows you the steps, and begins executing.
4. You can monitor progress, pause, or redirect at any time.
5. Claude delivers the final output when done.

### Core Capabilities

| Capability | Description |
|:---|:---|
| **Desktop File Access** | Reads and analyzes files on your local computer (with permission). |
| **Web Browsing** | Searches the internet, reads web pages, and gathers information autonomously. |
| **Multi-Step Execution** | Breaks complex tasks into steps and executes them sequentially. |
| **Progress Monitoring** | Shows real-time progress of the task being executed. |
| **Document Generation** | Creates documents, reports, and analysis outputs as it works. |

### Potential Use Cases for Apollo (Phase 2)

1. **Competitive Analysis Automation**
   - Task: *"Research the top 5 energy management companies in Germany. For each, find their services, pricing model, key clients, and recent news. Compile into a comparison report."*
   - Cowork browses company websites, gathers data, and generates a formatted report — all autonomously.

2. **Regulation Monitoring**
   - Task: *"Check the latest EU energy efficiency regulations published this month. Summarize any changes that affect our clients."*
   - Cowork browses official EU regulation portals, extracts relevant updates, and creates a summary document.

3. **Client Report Compilation**
   - Task: *"Read the 12 monthly energy reports in my Documents/Samsung folder. Create a year-end summary with trends, peak usage months, and annual savings."*
   - Cowork processes all 12 files locally and generates a consolidated annual report.

4. **Job Posting Research**
   - Task: *"Find 10 similar energy consultant job postings on LinkedIn and Indeed. Extract the required skills, salary ranges, and experience levels into a comparison table."*
   - Cowork browses job sites and compiles the data automatically.

---

## 13. Keyboard Shortcuts & Productivity Tips

### Essential Keyboard Shortcuts

| Shortcut | Action |
|:---|:---|
| **Enter** | Send message. |
| **Shift + Enter** | New line within a message (without sending). |
| **Cmd + K** (Mac) / **Ctrl + K** (Windows) | Open quick search — search across all conversations and projects. |
| **Cmd + N** (Mac) / **Ctrl + N** (Windows) | Start a new chat. |
| **Cmd + Shift + C** (Mac) | Copy the last Claude response to clipboard. |
| **/** (Forward Slash) | Open command palette for quick actions. |
| **↑ (Up Arrow)** | Edit your last sent message. |

### Productivity Tips

1. **Use Projects, Not Standalone Chats:** Always work inside projects. This keeps context organized and prevents data mixing.
2. **Name Your Chats:** Right-click any chat in the sidebar to rename it with a descriptive title (e.g., "Samsung Q3 Audit Draft 2").
3. **Pin Important Projects:** Star frequently used projects so they stay at the top of the sidebar.
4. **Switch Models Strategically:** Start drafting with Sonnet 5 Medium for speed, then switch to Opus for the final review pass.
5. **Use Artifacts for Deliverables:** When you need a document, dashboard, or diagram, ask Claude to create it as an artifact — it's easier to edit, version, and download than chat text.
6. **Copy Code from Artifacts:** Artifacts have a one-click copy button — use it to quickly move generated content to other tools.
7. **Drag & Drop Files:** You can drag files directly from your desktop into the chat input area to attach them.
8. **Voice for Long Descriptions:** Use the microphone button when you need to describe a complex task — speaking is often faster than typing.

---

## 14. Summary: Feature-to-Apollo Value Map

| Feature | What It Does | Apollo Value | Priority |
|:---|:---|:---|:---|
| **Projects** | Isolated workspaces with files & instructions | Secure client data management, GDPR compliance, team collaboration | 🔴 High — Immediate |
| **Artifacts** | Interactive visual outputs | Client dashboards, reports, flowcharts, proposals | 🔴 High — Immediate |
| **Skills** | Automated reusable workflows | Standardize reports, emails, social posts across the team | 🟡 Medium — After Projects |
| **Connectors** | Third-party app integrations | Unify Google Drive, Gmail, HubSpot, Figma, Slack | 🟡 Medium — Phase 2 |
| **Plugins** | Extended capabilities | Advanced data analysis, translation, web research | 🟢 Low — Future |
| **Cowork** | Autonomous background agent | Multi-step research, report compilation, monitoring | 🟡 Medium — Phase 2 |

---

## 15. Recommended Implementation Roadmap

### Phase 1: Foundation (Current — Week 1-2) ✅
- [x] Research Claude's enterprise features.
- [x] Create GDPR & Team Efficiency Guide.
- [x] Deliver live presentation with FigJam diagram.
- [ ] Test all features hands-on with enterprise credentials.
- [ ] Finalize this feature analysis document.

### Phase 2: Integration (Week 3-4)
- [ ] Connect priority connectors (Google Drive, Gmail, HubSpot).
- [ ] Create first set of team Skills (Energy Report Formatter, Email Drafter).
- [ ] Set up shared Projects for key departments (HR, Client Audits, Marketing).
- [ ] Explore Cowork for automated research and report compilation tasks.
- [ ] Build a Cowork demo: automated competitive analysis workflow.

### Phase 3: Automation & Scaling (Week 5+)
- [ ] Implement HR automation workflows using Cowork and MCPs.
- [ ] Onboard remaining team members to the Claude workspace.
- [ ] Create team-specific Skills based on each department's workflows.
- [ ] Evaluate Plugins marketplace for additional capabilities.
- [ ] Measure efficiency gains and compile ROI report.
