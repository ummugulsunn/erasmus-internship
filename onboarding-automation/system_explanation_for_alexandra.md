# 🌿 Apollo Green Solutions — Onboarding Automation System

### A Complete Guide for Alexandra Xanthopoulos

---

> **What is this?**
> This system automatically sends beautiful, branded welcome emails to new employees — so you never have to write one manually again. Just tell it *who* is joining, and it handles the rest.

> **Note:** This document is written for someone with **zero technical background**. No code knowledge needed — just read along! ☕

---

## 📋 Table of Contents

1. The Big Picture
2. Level 1 — Claude Chat + MCP (Talk to AI)
3. Level 2 — Google Form (Click & Submit)
4. Level 3 — CSV Batch (Bulk Onboarding)
5. Comparison Table
6. What the New Employee Receives
7. Why It Only Works on Ümmügülsün's Laptop Right Now
8. How to Set It Up on Your Computer
9. Security & Privacy
10. Frequently Asked Questions (FAQ)

---

## 🎯 The Big Picture

Think of this system like a **smart assistant for HR**. Instead of manually writing welcome emails, copying schedules, and formatting checklists every time someone new joins — the system does it all in seconds.

There are **three ways** to use it, depending on your situation:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                   🌿 ONBOARDING AUTOMATION                      │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐       │
│   │             │  │             │  │                  │       │
│   │  Level 1    │  │  Level 2    │  │   Level 3        │       │
│   │  💬 Claude  │  │  📝 Google  │  │   📊 CSV Batch   │       │
│   │   Chat      │  │   Form      │  │   (Spreadsheet)  │       │
│   │             │  │             │  │                  │       │
│   └──────┬──────┘  └──────┬──────┘  └────────┬─────────┘       │
│          │                │                  │                 │
│          ▼                ▼                  ▼                 │
│   ┌─────────────────────────────────────────────────────┐       │
│   │            📧 Branded Welcome Email                 │       │
│   │         (sent to the new employee)                  │       │
│   └─────────────────────────────────────────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**All three levels produce the same result:** a professionally branded Apollo welcome email arrives in the new employee's inbox.

---

## 💬 Level 1 — Claude Chat + MCP (Talk to AI)

### What is it?

You open the **Claude Desktop app** (it looks like any other app on your computer — like opening Word or Chrome) and simply **type a sentence** telling Claude who to onboard. That's it. Claude sends the email for you.

### How does it work?

```
 ╔═══════════════════════════════════════════════════════════╗
 ║  YOU (Alexandra)                                         ║
 ║                                                          ║
 ║  💬 "Onboard Maria Schmidt, Junior Energy Consultant,    ║
 ║      Engineering, starting July 21,                      ║
 ║      send to maria@apollo-gs.com"                        ║
 ╚═══════════════════════╤═══════════════════════════════════╝
                         │
                         ▼
 ╔═══════════════════════════════════════════════════════════╗
 ║  🤖 CLAUDE AI                                            ║
 ║                                                          ║
 ║  "Got it! I'll prepare a welcome email for Maria..."     ║
 ║                                                          ║
 ║  Claude understands your sentence and extracts:          ║
 ║  • Name: Maria Schmidt                                  ║
 ║  • Role: Junior Energy Consultant                        ║
 ║  • Department: Engineering                               ║
 ║  • Start Date: July 21                                   ║
 ║  • Email: maria@apollo-gs.com                            ║
 ╚═══════════════════════╤═══════════════════════════════════╝
                         │
                         ▼
 ╔═══════════════════════════════════════════════════════════╗
 ║  ⚙️  MCP EMAIL SERVER (runs in the background)           ║
 ║                                                          ║
 ║  This is a small program that Claude activates behind    ║
 ║  the scenes. You never see it or interact with it.       ║
 ║                                                          ║
 ║  It takes the information, fills in the email template,  ║
 ║  and sends it through Apollo's email system.             ║
 ╚═══════════════════════╤═══════════════════════════════════╝
                         │
                         ▼
 ╔═══════════════════════════════════════════════════════════╗
 ║  📧 MARIA'S INBOX                                        ║
 ║                                                          ║
 ║  ┌─────────────────────────────────────────────────┐     ║
 ║  │  🌿 Welcome to Apollo Green Solutions, Maria!   │     ║
 ║  │                                                 │     ║
 ║  │  Your first-week schedule...                    │     ║
 ║  │  Your onboarding checklist...                   │     ║
 ║  │  Your key contacts...                           │     ║
 ║  └─────────────────────────────────────────────────┘     ║
 ╚═══════════════════════════════════════════════════════════╝
```

### What does "MCP" mean?

**MCP** stands for **Model Context Protocol**. Don't worry about the name — here's what it means in plain language:

🧩 MCP is like a **plug-in** that gives Claude **extra abilities**. Normally, Claude can only chat with you. But with MCP, Claude can also *do things* — like send emails, read files, or connect to other tools. Think of it like adding a printer to your computer: once connected, you can print from any app.

### When to use Level 1

✅ You want to onboard **one person** quickly
✅ You're already at your computer with Claude open
✅ You like the flexibility of natural language ("just tell it what to do")

---

## 📝 Level 2 — Google Form (Click & Submit)

### What is it?

A simple **online form** — like filling out a survey. You type the new employee's details into the form fields, click **Submit**, and the welcome email is sent automatically.

### How does it work?

```
 ╔═══════════════════════════════════════════════════════════╗
 ║  YOU (Alexandra) — opens a link in any web browser       ║
 ║                                                          ║
 ║  📝 Google Form: "New Employee Onboarding"               ║
 ║                                                          ║
 ║  ┌─────────────────────────────────────────┐             ║
 ║  │  Full Name:     [ Maria Schmidt       ] │             ║
 ║  │  Role:          [ Jr. Energy Consult.  ] │             ║
 ║  │  Department:    [ Engineering     ▼    ] │             ║
 ║  │  Start Date:    [ 📅 July 21, 2026    ] │             ║
 ║  │  Manager:       [ A. Xanthopoulos     ] │             ║
 ║  │  Email:         [ maria@apollo-gs.com  ] │             ║
 ║  │                                         │             ║
 ║  │           [ 🟢 Submit ]                 │             ║
 ║  └─────────────────────────────────────────┘             ║
 ╚═══════════════════════╤═══════════════════════════════════╝
                         │
                         ▼
 ╔═══════════════════════════════════════════════════════════╗
 ║  ⚙️  GOOGLE APPS SCRIPT (runs automatically in Google)   ║
 ║                                                          ║
 ║  When you click Submit, a small script runs inside       ║
 ║  Google's servers. It reads the form data and sends      ║
 ║  the branded email — all in the cloud, nothing on        ║
 ║  your computer.                                          ║
 ╚═══════════════════════╤═══════════════════════════════════╝
                         │
                         ▼
 ╔═══════════════════════════════════════════════════════════╗
 ║  📧 MARIA'S INBOX                                        ║
 ║                                                          ║
 ║  Same beautiful branded email as Level 1 ✅              ║
 ╚═══════════════════════════════════════════════════════════╝
```

### When to use Level 2

✅ You don't have Claude Desktop installed
✅ You're using someone else's computer, a tablet, or your phone
✅ You want the **simplest possible option** — no installation, no setup
✅ You want to delegate onboarding to HR staff who don't use Claude

---

## 📊 Level 3 — CSV Batch (Bulk Onboarding)

### What is it?

For when you're hiring **multiple people at once** (e.g., 5 new interns starting the same month). Instead of sending emails one by one, you add all their details to a **spreadsheet**, and the system sends all welcome emails at once.

### How does it work?

```
 ╔═══════════════════════════════════════════════════════════╗
 ║  📊 SPREADSHEET (CSV FILE)                               ║
 ║                                                          ║
 ║  Think of it like an Excel file with columns:            ║
 ║                                                          ║
 ║  ┌────────────────┬──────────────┬────────┬──────────┐   ║
 ║  │ Name           │ Role         │ Dept   │ Email    │   ║
 ║  ├────────────────┼──────────────┼────────┼──────────┤   ║
 ║  │ Maria Schmidt  │ Jr. Consult. │ Eng.   │ maria@.. │   ║
 ║  │ Lukas Weber    │ Analyst      │ Data   │ lukas@.. │   ║
 ║  │ Sophie Braun   │ Intern       │ Solar  │ sophie@..│   ║
 ║  │ ...            │ ...          │ ...    │ ...      │   ║
 ║  └────────────────┴──────────────┴────────┴──────────┘   ║
 ╚═══════════════════════╤═══════════════════════════════════╝
                         │
                         ▼  Runs automatically every
                         │  Monday at 09:00 ⏰
                         │
 ╔═══════════════════════════════════════════════════════════╗
 ║  🐍 PYTHON SCRIPT (a small program)                      ║
 ║                                                          ║
 ║  Every Monday morning, this script:                      ║
 ║  1. Opens the spreadsheet                                ║
 ║  2. Finds rows that haven't been processed yet           ║
 ║  3. Sends a welcome email to each person                 ║
 ║  4. Marks them as "sent" ✅                              ║
 ╚═══════════════════════╤═══════════════════════════════════╝
                         │
                         ▼
 ╔═══════════════════════════════════════════════════════════╗
 ║  📧 EVERYONE'S INBOX                                     ║
 ║                                                          ║
 ║  Maria ✅  Lukas ✅  Sophie ✅                            ║
 ║  All receive branded welcome emails simultaneously!      ║
 ╚═══════════════════════════════════════════════════════════╝
```

### When to use Level 3

✅ You're onboarding **3 or more people** at the same time
✅ You have a list ready (e.g., from recruitment)
✅ You want to schedule it in advance and let it run on its own

---

## 📊 Comparison Table — Which Level Should I Use?

| Feature | 💬 Claude Chat (MCP) | 📝 Google Form | 📊 CSV Batch |
|---|---|---|---|
| **Best for** | Quick, one-off onboarding | Anyone, anywhere | Bulk onboarding |
| **How you use it** | Type a sentence to Claude | Fill in a web form | Add rows to a spreadsheet |
| **Setup required?** | Yes (10 minutes, one-time) | ❌ No — works immediately | Yes (Python needed) |
| **Software to install?** | Claude Desktop + Node.js | None — just a browser | Python |
| **Works on any device?** | Only on configured computer | ✅ Any device with a browser | Only on configured computer |
| **People per use** | 1 at a time | 1 at a time | Unlimited (batch) |
| **Scheduling** | On demand (you decide when) | On demand (you decide when) | Automatic (every Monday 09:00) |
| **Technical skill needed** | None — just type naturally | None — just fill in fields | Minimal — edit a spreadsheet |
| **Flexibility** | ⭐⭐⭐ Very flexible | ⭐⭐ Structured fields | ⭐⭐ Structured columns |
| **Speed** | ~10 seconds | ~30 seconds | Runs on schedule |
| **Can delegate to HR staff?** | Only if they have Claude | ✅ Yes — share the form link | If they can edit spreadsheets |

> **💡 Recommendation:** Start with **Level 2 (Google Form)** for daily use — it requires no setup and works immediately. Use **Level 1 (Claude Chat)** when you want more flexibility and are at your own computer.

---

## 📧 What the New Employee Receives

Every new hire receives a **single, professional email** that contains everything they need for their first week. Here's what's inside:

### 🎨 Email Design

The email uses **official Apollo Green Solutions branding**:
- **Primary color:** Dark Green (`#004d40`) — the Apollo signature green
- **Clean, modern layout** — looks professional on desktop and mobile
- **Apollo logo and company name** at the top

### 📬 Email Contents

The email is divided into **four sections**:

---

**Section 1 — Welcome Message** 🤝

> *"Dear Maria, Welcome to Apollo Green Solutions! We're thrilled to have you join our team as Junior Energy Consultant in the Engineering department. Your first day is July 21, 2026..."*

A warm, personal greeting that makes the new hire feel expected and valued.

---

**Section 2 — First-Week Schedule** 📅

| Day | Activity |
|-----|----------|
| **Day 1 (Monday)** | Welcome & orientation, office tour, IT setup |
| **Day 2 (Tuesday)** | HR paperwork, team introductions, tool access |
| **Day 3 (Wednesday)** | Department deep-dive, first project briefing |
| **Day 4 (Thursday)** | Shadow a colleague, hands-on learning |
| **Day 5 (Friday)** | Week review, Q&A with manager, goal setting |

---

**Section 3 — Onboarding Checklist** ✅

A 10-item checklist so nothing falls through the cracks:

1. ☐ Sign employment contract
2. ☐ Complete HR registration forms
3. ☐ Collect laptop & IT equipment
4. ☐ Set up company email account
5. ☐ Get building access badge / keys
6. ☐ Complete health & safety briefing
7. ☐ Review company handbook & policies
8. ☐ Set up project management tools
9. ☐ Meet your team & key stakeholders
10. ☐ Schedule first 1:1 with your manager

---

**Section 4 — Key Contacts** 📞

| Role | Who to Contact |
|------|---------------|
| **Your Manager** | Alexandra Xanthopoulos |
| **IT Support** | IT Help Desk |
| **HR Contact** | Human Resources |
| **Office Admin** | Office Management |

---

## 🔒 Why It Only Works on Ümmügülsün's Laptop Right Now

This is the most common question, so let's break it down in very simple terms:

```
 Ümmügülsün's Laptop
 ┌──────────────────────────────────────────────────┐
 │                                                  │
 │  📱 Claude Desktop App                           │
 │       │                                          │
 │       │  "Hey, send an email!"                   │
 │       ▼                                          │
 │  📄 Config File (claude_desktop_config.json)     │
 │       │                                          │
 │       │  This file says:                         │
 │       │  • WHERE the email program is located    │
 │       │  • WHAT password to use for sending      │
 │       ▼                                          │
 │  ⚙️  MCP Email Server (a small program)          │
 │       │                                          │
 │       │  This program ONLY exists on this laptop │
 │       ▼                                          │
 │  📧 Email gets sent!                             │
 │                                                  │
 └──────────────────────────────────────────────────┘

 Alexandra's Laptop (current state)
 ┌──────────────────────────────────────────────────┐
 │                                                  │
 │  📱 Claude Desktop App (if installed)            │
 │       │                                          │
 │       ▼                                          │
 │  ❌ No config file → Claude doesn't know         │
 │     about the email server                       │
 │                                                  │
 │  ❌ No MCP email program installed               │
 │                                                  │
 │  ❌ No email password stored                     │
 │                                                  │
 │  Result: Claude can only chat, not send emails   │
 │                                                  │
 └──────────────────────────────────────────────────┘
```

### In simple terms:

The email-sending ability is like a **printer**:
- 🖨️ Ümmügülsün's laptop has the printer **plugged in and configured**
- 💻 Your laptop doesn't have the printer yet — but we can set it up!
- 🌐 Or you can use the **Google Form** (Level 2), which is like using an online printing service — no printer needed on your computer

---

## 🛠️ How to Set It Up on Your Computer

> **⚠️ Important:** This setup takes approximately **10–15 minutes** and only needs to be done **once**. After that, everything works automatically every time you open Claude.

### Prerequisites

- A computer running **Windows** or **macOS**
- An internet connection
- The email credentials (Ümmügülsün will provide these)

### Step-by-Step Instructions

---

**Step 1 — Install Node.js** ⬇️

*Time: ~3 minutes*

1. Open your web browser (Chrome, Safari, Edge, etc.)
2. Go to: **https://nodejs.org**
3. Click the big green button that says **"LTS"** (this stands for Long-Term Support — it's the stable version)
4. A file will download — double-click it and follow the installation wizard
5. Click **Next → Next → Next → Install → Finish**

> 💡 *What is Node.js?* It's a program that lets your computer run small tools written in JavaScript. The email server is one of these tools. You'll never need to open Node.js yourself — it just needs to be there in the background.

---

**Step 2 — Install Claude Desktop** ⬇️

*Time: ~2 minutes*

1. Go to: **https://claude.ai/download**
2. Download and install the app for your operating system
3. Open it and sign in with your Anthropic account

> 💡 *If you already have Claude Desktop installed, skip this step!*

---

**Step 3 — Copy the Project Files** 📁

*Time: ~2 minutes*

1. Ümmügülsün will give you a folder (via USB stick, email, or shared drive)
2. Copy this folder to a location on your computer, for example:
   - **Mac:** `/Users/alexandra/onboarding-automation/`
   - **Windows:** `C:\Users\alexandra\onboarding-automation\`
3. Remember this location — you'll need it in the next step

---

**Step 4 — Configure Claude Desktop** ⚙️

*Time: ~3 minutes*

1. Open Claude Desktop
2. Go to **Settings** (gear icon) → **Developer** → **Edit Config**
3. This opens a text file. Replace its contents with the configuration that Ümmügülsün provides
4. The configuration will contain:
   - The **path** to the email server on your computer
   - The **SMTP credentials** (email sending details)
5. Save the file and **restart Claude Desktop**

> ⚠️ *Ümmügülsün will prepare the exact configuration text for you — you just need to paste it in.*

---

**Step 5 — Test It!** 🧪

*Time: ~1 minute*

1. Open Claude Desktop
2. Type: **"Send a test onboarding email to my email address"**
3. Claude should confirm the email was sent
4. Check your inbox — you should see the branded welcome email! 🎉

---

**Step 6 — You're Done!** 🎉

From now on, every time you open Claude, you can simply type a sentence like:

> *"Onboard Maria Schmidt, Junior Energy Consultant, Engineering, starting July 21, send to maria@apollo-gs.com"*

...and the email will be sent automatically.

---

## 🔐 Security & Privacy

| Concern | How it's handled |
|---------|-----------------|
| **Email passwords** | Stored locally on your computer in a config file — Claude AI **never sees** the actual passwords. The background program handles them directly. |
| **Employee data** | Not stored anywhere permanently. The email is sent and that's it — no database of employee information is created. |
| **Who can send emails?** | Only someone who has the system set up on their computer (with the correct credentials). |
| **Can Claude read our emails?** | ❌ No. Claude can only **send** emails through the configured server. It cannot read, access, or browse any mailbox. |
| **What if someone gets the config file?** | They would need both the file AND access to your computer. The credentials can be changed at any time. |

---

## ❓ Frequently Asked Questions (FAQ)

### General Questions

**Q: Is this sending real emails or just a demo?**
> ✅ **These are real emails.** When you use the system, actual emails arrive in real inboxes. This is not a mockup or prototype — it's a fully working system.

**Q: Can I customize what the email says?**
> Yes! The email content is stored in a single HTML template file. Ümmügülsün can modify the text, colors, schedule, checklist items — anything you want. Just let her know what changes you'd like.

**Q: What if I type the wrong email address?**
> The email will be sent to whatever address you provide. Always double-check the email address before confirming. Claude will show you the details before sending, so you have a chance to review.

**Q: Can I use this for anything other than onboarding?**
> The system is currently designed specifically for onboarding welcome emails. However, it could be adapted for other types of automated emails (e.g., offboarding, project kickoffs) with some modifications.

---

### Level 1 (Claude Chat) Questions

**Q: What if I don't phrase the sentence perfectly?**
> Claude is very flexible with language. All of these would work:
> - *"Onboard Maria Schmidt as Junior Energy Consultant in Engineering, start date July 21, email maria@apollo-gs.com"*
> - *"Please send a welcome email to Maria Schmidt, she's starting July 21 as a Junior Consultant in Engineering"*
> - *"New hire: Maria Schmidt, maria@apollo-gs.com, Junior Energy Consultant, Engineering dept, starts 21.07"*
>
> Claude understands natural language — just include the name, role, department, start date, and email address somewhere in your message.

**Q: What if Claude asks me a question back?**
> If you forget a detail (like the start date), Claude will simply ask you for the missing information. Just answer, and it will proceed.

**Q: Do I need to be connected to the internet?**
> Yes — Claude needs an internet connection to process your request and the email server needs internet to send the email.

---

### Level 2 (Google Form) Questions

**Q: Where do I find the Google Form?**
> Ümmügülsün will share the form link with you. You can bookmark it in your browser or save it to your phone's home screen.

**Q: Can I share the form with HR staff?**
> Yes! That's one of the best features of Level 2 — anyone with the link can submit an onboarding request from any device.

**Q: Does the Google Form work on my phone?**
> ✅ Yes, it works on any device with a web browser — phone, tablet, or computer.

---

### Level 3 (CSV Batch) Questions

**Q: What is a CSV file?**
> CSV stands for "Comma-Separated Values." It's basically a simple spreadsheet — you can open and edit it in Excel, Google Sheets, or any text editor. Each row is a person, and each column is a piece of information (name, role, email, etc.).

**Q: What if I add someone to the spreadsheet on a Wednesday?**
> The batch script runs every **Monday at 09:00**. So that person's email would be sent the following Monday. If you need to send it sooner, use Level 1 or Level 2 instead.

**Q: Can the schedule be changed from Monday 09:00?**
> Yes, the timing can be adjusted. Talk to Ümmügülsün about your preferred schedule.

---

### Troubleshooting

**Q: I set up Level 1, but Claude says it can't send emails. What do I do?**
> Try these steps in order:
> 1. **Restart Claude Desktop** — close it completely and reopen it
> 2. **Check your internet connection**
> 3. **Contact Ümmügülsün** — the config file may need a small adjustment

**Q: The email was sent but the new hire didn't receive it.**
> - Ask them to check their **spam/junk folder**
> - Verify the email address was typed correctly
> - Wait a few minutes — sometimes emails take 1–2 minutes to arrive

**Q: I want to change the Apollo branding or email design.**
> Let Ümmügülsün know — she can update the email template. Changes take effect immediately for all future emails.

---

## 📞 Contact & Support

| Who | For what |
|-----|----------|
| **Ümmügülsün Türkmen** | Technical issues, setup help, template changes, any questions about how the system works |
| **Alexandra Xanthopoulos** | Approval for new features, deciding which level to use company-wide |

---

## 📌 Quick Reference Card

Save this somewhere handy! 📎

```
╔══════════════════════════════════════════════════════╗
║  🌿 ONBOARDING — QUICK REFERENCE                    ║
║                                                      ║
║  NEED TO ONBOARD 1 PERSON QUICKLY?                   ║
║  → Open Claude → Type who's joining → Done ✅        ║
║                                                      ║
║  DON'T HAVE CLAUDE ON THIS DEVICE?                   ║
║  → Open the Google Form link in any browser → Done ✅║
║                                                      ║
║  ONBOARDING 3+ PEOPLE AT ONCE?                       ║
║  → Add them to the spreadsheet → Emails go out       ║
║    automatically on Monday morning ✅                 ║
║                                                      ║
║  SOMETHING NOT WORKING?                              ║
║  → Contact Ümmügülsün                                ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

---

*Document prepared by Ümmügülsün Türkmen — Erasmus Internship, Apollo Green Solutions*
*Last updated: July 15, 2026*
