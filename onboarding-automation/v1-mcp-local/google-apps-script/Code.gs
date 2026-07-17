/**
 * Apollo Green Solutions — Onboarding Email Automation
 * 
 * Triggers automatically when the Google Form is submitted.
 * Sends a branded HTML welcome email to the new employee.
 * Logs the result in the "Send Log" sheet.
 * 
 * Setup:
 *   1. Paste this into Extensions → Apps Script in the linked Google Sheet
 *   2. Run setupTrigger() once to activate the form-submit trigger
 *   3. That's it — every new form submission auto-sends the welcome email
 */

// ──────────────────────────────────────────
// CONFIG — change these for your company
// ──────────────────────────────────────────
const SENDER_NAME = "Apollo Green Solutions";
const COMPANY_DOMAIN = "apollo-gs.com";
const LOGO_URL = "https://static.wixstatic.com/media/0f65e1_01e3e52a87204174abe2e0cd37building_1.png"; // Replace with actual Apollo logo URL
const FAVICON_URL = "https://www.apollo-gs.com/favicon.ico";

// ──────────────────────────────────────────
// TRIGGER SETUP — run this once manually
// ──────────────────────────────────────────
function setupTrigger() {
  // Remove any existing triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  
  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onFormSubmit()
    .create();
  
  Logger.log("✅ Trigger installed. New form submissions will auto-send onboarding emails.");
}

// ──────────────────────────────────────────
// MAIN — runs on every form submission
// ──────────────────────────────────────────
function onFormSubmit(e) {
  try {
    const responses = e.namedValues;
    
    const name       = responses["Full Name"][0].trim();
    const role       = responses["Role / Job Title"][0].trim();
    const department = responses["Department"][0].trim();
    const startDate  = responses["Start Date"][0].trim();
    const manager    = responses["Manager Name"][0].trim();
    const email      = responses["Employee Email"][0].trim();
    
    // Derive manager email (fallback heuristic)
    const managerEmail = manager.toLowerCase().replace(/\s+/g, ".") + "@" + COMPANY_DOMAIN;
    
    // Calculate Day 1-5 dates
    const dayDates = computeWeekDates(startDate);
    
    // Build the HTML email
    const htmlBody = buildEmailHtml(name, role, department, startDate, manager, managerEmail, dayDates);
    
    // Send the email
    GmailApp.sendEmail(email, 
      "Welcome to Apollo Green Solutions — Your Onboarding Guide", 
      "Welcome to Apollo Green Solutions, " + name + "! Please view this email in an HTML-capable client.",
      {
        htmlBody: htmlBody,
        name: SENDER_NAME
      }
    );
    
    // Log the send
    logSend(name, email, role, department, startDate, "SENT");
    
  } catch (error) {
    Logger.log("ERROR: " + error.toString());
    // Try to log the failure
    try {
      logSend(
        e.namedValues["Full Name"][0] || "UNKNOWN", 
        e.namedValues["Employee Email"][0] || "UNKNOWN",
        "", "", "",
        "FAILED: " + error.toString()
      );
    } catch (e2) {
      Logger.log("Could not log failure: " + e2.toString());
    }
  }
}

// ──────────────────────────────────────────
// COMPUTE WEEK DATES
// ──────────────────────────────────────────
function computeWeekDates(startDateStr) {
  const months = {
    "january":0,"february":1,"march":2,"april":3,"may":4,"june":5,
    "july":6,"august":7,"september":8,"october":9,"november":10,"december":11,
    "jan":0,"feb":1,"mar":2,"apr":3,"jun":5,"jul":6,"aug":7,"sep":8,"oct":9,"nov":10,"dec":11
  };
  
  let dt = new Date(startDateStr);
  
  // If Date() couldn't parse it, try manual parsing
  if (isNaN(dt.getTime())) {
    const parts = startDateStr.replace(/,/g, "").split(/\s+/);
    if (parts.length >= 3) {
      const monthKey = parts[0].toLowerCase();
      if (months[monthKey] !== undefined) {
        dt = new Date(parseInt(parts[2]), months[monthKey], parseInt(parts[1]));
      }
    }
  }
  
  if (isNaN(dt.getTime())) {
    return ["", "", "", "", ""];
  }
  
  const result = [];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let i = 0; i < 5; i++) {
    const d = new Date(dt);
    d.setDate(dt.getDate() + i);
    result.push(monthNames[d.getMonth()] + " " + d.getDate());
  }
  return result;
}

// ──────────────────────────────────────────
// SEND LOG
// ──────────────────────────────────────────
function logSend(name, email, role, department, startDate, status) {
  const ss = SpreadsheetApp.getActive();
  let logSheet = ss.getSheetByName("Send Log");
  
  if (!logSheet) {
    logSheet = ss.insertSheet("Send Log");
    logSheet.appendRow(["Timestamp", "Name", "Email", "Role", "Department", "Start Date", "Status"]);
    logSheet.getRange("1:1").setFontWeight("bold");
  }
  
  logSheet.appendRow([
    new Date().toISOString(),
    name,
    email,
    role,
    department,
    startDate,
    status
  ]);
}

// ──────────────────────────────────────────
// HTML EMAIL BUILDER
// ──────────────────────────────────────────
function buildEmailHtml(name, role, department, startDate, manager, managerEmail, dayDates) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Welcome to Apollo Green Solutions</title>
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  body { margin: 0; padding: 0; width: 100% !important; background-color: #f2f6f4; }
  a { text-decoration: none; }
  @media only screen and (max-width: 620px) {
    .email-container { width: 100% !important; }
    .fluid-padding { padding-left: 20px !important; padding-right: 20px !important; }
    .stack-col { display: block !important; width: 100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#f2f6f4;">

<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
Your first week at Apollo Green Solutions starts here — schedule, checklist, and key contacts inside.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f6f4;">
<tr><td align="center" style="padding:32px 12px;">

<table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #dfe9e4;">

<!-- HEADER -->
<tr>
<td class="fluid-padding" style="background-color:#004d40;padding:28px 36px;border-radius:10px 10px 0 0;">
  <img src="${FAVICON_URL}" alt="Apollo GS" style="height:40px;display:block;">
  <div style="font-family:Helvetica,Arial,sans-serif;color:#ffffff;font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.85;margin-top:14px;">APOLLO GREEN SOLUTIONS</div>
  <div style="font-family:Helvetica,Arial,sans-serif;color:#ffffff;font-size:24px;font-weight:bold;margin-top:6px;line-height:1.3;">Welcome to the team, ${name}!</div>
</td>
</tr>

<!-- INTRO -->
<tr>
<td class="fluid-padding" style="padding:32px 36px 8px 36px;font-family:Helvetica,Arial,sans-serif;color:#1f2b26;font-size:15px;line-height:1.65;">
  <p style="margin:0 0 16px 0;">Dear ${name},</p>
  <p style="margin:0 0 16px 0;">On behalf of everyone at Apollo Green Solutions, welcome aboard! We're delighted to have you join us as our new <strong>${role}</strong> in the ${department} department, starting <strong>${startDate}</strong>.</p>
  <p style="margin:0 0 16px 0;">Apollo helps commercial and industrial clients across Germany and the EU transition to sustainable, compliant, and cost-effective energy systems. We combine custom hardware, AI-driven software, and expert consulting to build powerful Energy Management Systems.</p>
  <p style="margin:0;">Your manager <strong>${manager}</strong> and the team are looking forward to welcoming you. Here's everything you need for your first week.</p>
</td>
</tr>

<!-- DIVIDER -->
<tr><td style="padding:24px 36px 0 36px;"><div style="border-top:1px solid #e2ece7;"></div></td></tr>

<!-- FIRST-WEEK SCHEDULE -->
<tr>
<td class="fluid-padding" style="padding:28px 36px 4px 36px;">
  <div style="font-family:Helvetica,Arial,sans-serif;color:#004d40;font-size:17px;font-weight:bold;margin-bottom:14px;">Your First-Week Schedule</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Helvetica,Arial,sans-serif;font-size:13.5px;color:#1f2b26;border-collapse:collapse;">
    <tr>
      <td style="background-color:#e6f5ec;color:#004d40;font-size:11.5px;text-transform:uppercase;letter-spacing:0.4px;font-weight:bold;padding:10px 12px;border:1px solid #dfe9e4;width:80px;">Day</td>
      <td style="background-color:#e6f5ec;color:#004d40;font-size:11.5px;text-transform:uppercase;letter-spacing:0.4px;font-weight:bold;padding:10px 12px;border:1px solid #dfe9e4;">Focus</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;vertical-align:top;"><span style="display:inline-block;background-color:#1e7a4c;color:#ffffff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 1</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[0]}</span></td>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;">IT setup (email, Teams, tools access), welcome meeting with ${manager}, office tour.</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;vertical-align:top;background-color:#fafcfb;"><span style="display:inline-block;background-color:#1e7a4c;color:#ffffff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 2</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[1]}</span></td>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;background-color:#fafcfb;">Company culture & values, introduction to EMS platform and Edge devices, team introductions.</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;vertical-align:top;"><span style="display:inline-block;background-color:#1e7a4c;color:#ffffff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 3</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[2]}</span></td>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;">Role-specific training, shadow a senior colleague, review ongoing projects.</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;vertical-align:top;background-color:#fafcfb;"><span style="display:inline-block;background-color:#1e7a4c;color:#ffffff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 4</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[3]}</span></td>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;background-color:#fafcfb;">Deep dive into compliance (NIS2, ISO 50001), CRM walkthrough, first task assignment.</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;vertical-align:top;"><span style="display:inline-block;background-color:#1e7a4c;color:#ffffff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 5</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[4]}</span></td>
      <td style="padding:10px 12px;border:1px solid #dfe9e4;">End-of-week check-in with ${manager}, feedback session, goals for Week 2.</td>
    </tr>
  </table>
</td>
</tr>

<!-- DIVIDER -->
<tr><td style="padding:24px 36px 0 36px;"><div style="border-top:1px solid #e2ece7;"></div></td></tr>

<!-- CHECKLIST -->
<tr>
<td class="fluid-padding" style="padding:28px 36px 4px 36px;">
  <div style="font-family:Helvetica,Arial,sans-serif;color:#004d40;font-size:17px;font-weight:bold;margin-bottom:14px;">Your Onboarding Checklist</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#1f2b26;">
    <tr><td style="padding:7px 0;border-bottom:1px solid #eef3f0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Receive and activate company email</td></tr>
    <tr><td style="padding:7px 0;border-bottom:1px solid #eef3f0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Set up Microsoft Teams profile</td></tr>
    <tr><td style="padding:7px 0;border-bottom:1px solid #eef3f0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Complete IT cybersecurity training (NIS2)</td></tr>
    <tr><td style="padding:7px 0;border-bottom:1px solid #eef3f0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Read company handbook</td></tr>
    <tr><td style="padding:7px 0;border-bottom:1px solid #eef3f0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Review EMS software platform demo</td></tr>
    <tr><td style="padding:7px 0;border-bottom:1px solid #eef3f0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Meet with manager (${manager})</td></tr>
    <tr><td style="padding:7px 0;border-bottom:1px solid #eef3f0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Meet team members (minimum 3 intro meetings)</td></tr>
    <tr><td style="padding:7px 0;border-bottom:1px solid #eef3f0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Review current project portfolio</td></tr>
    <tr><td style="padding:7px 0;border-bottom:1px solid #eef3f0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Submit signed employment documents to HR</td></tr>
    <tr><td style="padding:7px 0;"><span style="color:#1e7a4c;font-size:15px;">☐</span>&nbsp;&nbsp;Set up development / technical environment</td></tr>
  </table>
</td>
</tr>

<!-- DIVIDER -->
<tr><td style="padding:24px 36px 0 36px;"><div style="border-top:1px solid #e2ece7;"></div></td></tr>

<!-- KEY CONTACTS -->
<tr>
<td class="fluid-padding" style="padding:28px 36px 28px 36px;">
  <div style="font-family:Helvetica,Arial,sans-serif;color:#004d40;font-size:17px;font-weight:bold;margin-bottom:14px;">Key Contacts</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="stack-col" width="50%" valign="top" style="padding:0 8px 16px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f6f4;border-radius:8px;">
        <tr><td style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.4px;color:#1e7a4c;font-weight:bold;">Manager</div>
          <div style="font-size:14px;font-weight:bold;color:#004d40;margin-top:2px;">${manager}</div>
          <div style="font-size:13px;color:#5b6b64;margin-top:1px;">${managerEmail}</div>
        </td></tr>
        </table>
      </td>
      <td class="stack-col" width="50%" valign="top" style="padding:0 0 16px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f6f4;border-radius:8px;">
        <tr><td style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.4px;color:#1e7a4c;font-weight:bold;">IT Support</div>
          <div style="font-size:14px;font-weight:bold;color:#004d40;margin-top:2px;">IT Helpdesk</div>
          <div style="font-size:13px;color:#5b6b64;margin-top:1px;">it-support@${COMPANY_DOMAIN}</div>
        </td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td class="stack-col" width="50%" valign="top" style="padding:0 8px 0 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f6f4;border-radius:8px;">
        <tr><td style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.4px;color:#1e7a4c;font-weight:bold;">HR</div>
          <div style="font-size:14px;font-weight:bold;color:#004d40;margin-top:2px;">People & Operations</div>
          <div style="font-size:13px;color:#5b6b64;margin-top:1px;">hr@${COMPANY_DOMAIN}</div>
        </td></tr>
        </table>
      </td>
      <td class="stack-col" width="50%" valign="top" style="padding:0 0 0 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f6f4;border-radius:8px;">
        <tr><td style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.4px;color:#1e7a4c;font-weight:bold;">Office Manager</div>
          <div style="font-size:14px;font-weight:bold;color:#004d40;margin-top:2px;">Facilities & Logistics</div>
          <div style="font-size:13px;color:#5b6b64;margin-top:1px;">office@${COMPANY_DOMAIN}</div>
        </td></tr>
        </table>
      </td>
    </tr>
  </table>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center" style="background-color:#004d40;padding:22px 36px;border-radius:0 0 10px 10px;">
  <div style="font-family:Helvetica,Arial,sans-serif;color:#ffffff;font-size:12px;opacity:0.85;line-height:1.6;">
    Apollo Green Solutions · Energy Management & Compliance<br>
    © 2026 Apollo Green Solutions. All rights reserved.
  </div>
</td>
</tr>

</table>
</td></tr>
</table>

</body>
</html>`;
}

// ──────────────────────────────────────────
// MANUAL TEST — run this to test without form
// ──────────────────────────────────────────
function testSend() {
  const testEvent = {
    namedValues: {
      "Full Name": ["Test Employee"],
      "Role / Job Title": ["Junior Energy Consultant"],
      "Department": ["Engineering"],
      "Start Date": ["July 21, 2026"],
      "Manager Name": ["Alexandra Xanthopoulos"],
      "Employee Email": ["ummugulsumkor58@gmail.com"]  // ← change to your test email
    }
  };
  onFormSubmit(testEvent);
}
