#!/usr/bin/env node

/**
 * Apollo Onboarding Email MCP Server
 * 
 * Gives Claude the ability to send branded onboarding emails.
 * Communicates via stdio (Model Context Protocol).
 * 
 * Setup:
 *   Add to Claude Desktop config (~/.config/claude/claude_desktop_config.json):
 *   {
 *     "mcpServers": {
 *       "apollo-onboarding": {
 *         "command": "node",
 *         "args": ["/path/to/mcp-email-server/server.mjs"],
 *         "env": {
 *           "SMTP_HOST": "smtp.gmail.com",
 *           "SMTP_PORT": "587",
 *           "SMTP_USER": "your-email@gmail.com",
 *           "SMTP_PASSWORD": "your-app-password"
 *         }
 *       }
 *     }
 *   }
 */

import { createInterface } from 'readline';
import { createTransport } from 'nodemailer';

// ── SMTP Setup ──
const transporter = createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ── MCP Protocol Handler ──
const rl = createInterface({ input: process.stdin });

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

function computeWeekDates(startDateStr) {
  const dt = new Date(startDateStr);
  if (isNaN(dt.getTime())) return ['', '', '', '', ''];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const result = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(dt);
    d.setDate(dt.getDate() + i);
    result.push(`${months[d.getMonth()]} ${d.getDate()}`);
  }
  return result;
}

function buildEmailHtml(name, role, department, startDate, manager, managerEmail, dayDates) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Welcome to Apollo Green Solutions</title>
<style>
body,table,td,a{-webkit-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}
img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none}
body{margin:0;padding:0;width:100%!important;background-color:#f2f6f4}a{text-decoration:none}
@media only screen and (max-width:620px){.email-container{width:100%!important}.fluid-padding{padding-left:20px!important;padding-right:20px!important}.stack-col{display:block!important;width:100%!important}}
</style></head>
<body style="margin:0;padding:0;background-color:#f2f6f4;">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">Your first week at Apollo Green Solutions starts here.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f6f4;"><tr><td align="center" style="padding:32px 12px;">
<table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #dfe9e4;">

<tr><td class="fluid-padding" style="background-color:#004d40;padding:28px 36px;border-radius:10px 10px 0 0;">
<img src="https://www.apollo-gs.com/favicon.ico" alt="Apollo GS" style="height:40px;display:block;">
<div style="font-family:Helvetica,Arial,sans-serif;color:#fff;font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.85;margin-top:14px;">APOLLO GREEN SOLUTIONS</div>
<div style="font-family:Helvetica,Arial,sans-serif;color:#fff;font-size:24px;font-weight:bold;margin-top:6px;line-height:1.3;">Welcome to the team, ${name}!</div>
</td></tr>

<tr><td class="fluid-padding" style="padding:32px 36px 8px 36px;font-family:Helvetica,Arial,sans-serif;color:#1f2b26;font-size:15px;line-height:1.65;">
<p style="margin:0 0 16px 0;">Dear ${name},</p>
<p style="margin:0 0 16px 0;">On behalf of everyone at Apollo Green Solutions, welcome aboard! We're delighted to have you join us as our new <strong>${role}</strong> in the ${department} department, starting <strong>${startDate}</strong>.</p>
<p style="margin:0 0 16px 0;">Apollo helps commercial and industrial clients across Germany and the EU transition to sustainable, compliant, and cost-effective energy systems. We combine custom hardware, AI-driven software, and expert consulting to build powerful Energy Management Systems.</p>
<p style="margin:0;">Your manager <strong>${manager}</strong> and the team are looking forward to welcoming you.</p>
</td></tr>

<tr><td style="padding:24px 36px 0 36px;"><div style="border-top:1px solid #e2ece7;"></div></td></tr>

<tr><td class="fluid-padding" style="padding:28px 36px 4px 36px;">
<div style="font-family:Helvetica,Arial,sans-serif;color:#004d40;font-size:17px;font-weight:bold;margin-bottom:14px;">Your First-Week Schedule</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Helvetica,Arial,sans-serif;font-size:13.5px;color:#1f2b26;border-collapse:collapse;">
<tr><td style="background-color:#e6f5ec;color:#004d40;font-size:11.5px;text-transform:uppercase;letter-spacing:0.4px;font-weight:bold;padding:10px 12px;border:1px solid #dfe9e4;width:80px;">Day</td><td style="background-color:#e6f5ec;color:#004d40;font-size:11.5px;text-transform:uppercase;letter-spacing:0.4px;font-weight:bold;padding:10px 12px;border:1px solid #dfe9e4;">Focus</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #dfe9e4;"><span style="background-color:#1e7a4c;color:#fff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 1</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[0]}</span></td><td style="padding:10px 12px;border:1px solid #dfe9e4;">IT setup, welcome meeting with ${manager}, office tour.</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #dfe9e4;background-color:#fafcfb;"><span style="background-color:#1e7a4c;color:#fff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 2</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[1]}</span></td><td style="padding:10px 12px;border:1px solid #dfe9e4;background-color:#fafcfb;">Company culture, EMS platform intro, team introductions.</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #dfe9e4;"><span style="background-color:#1e7a4c;color:#fff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 3</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[2]}</span></td><td style="padding:10px 12px;border:1px solid #dfe9e4;">Role-specific training, shadow senior colleague.</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #dfe9e4;background-color:#fafcfb;"><span style="background-color:#1e7a4c;color:#fff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 4</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[3]}</span></td><td style="padding:10px 12px;border:1px solid #dfe9e4;background-color:#fafcfb;">Compliance deep dive (NIS2, ISO 50001), CRM walkthrough.</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #dfe9e4;"><span style="background-color:#1e7a4c;color:#fff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:4px;">Day 5</span><br><span style="color:#5b6b64;font-size:12px;">${dayDates[4]}</span></td><td style="padding:10px 12px;border:1px solid #dfe9e4;">Check-in with ${manager}, feedback, Week 2 goals.</td></tr>
</table></td></tr>

<tr><td style="padding:24px 36px 0 36px;"><div style="border-top:1px solid #e2ece7;"></div></td></tr>

<tr><td class="fluid-padding" style="padding:28px 36px 4px 36px;">
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
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
<tr><td align="left">
<a href="https://apollo-gs.com" style="display:inline-block;background-color:#1e7a4c;color:#ffffff;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:6px;">Open Interactive Checklist</a>
</td></tr>
</table>
</td></tr>

<tr><td style="padding:24px 36px 0 36px;"><div style="border-top:1px solid #e2ece7;"></div></td></tr>

<tr><td class="fluid-padding" style="padding:28px 36px 28px 36px;">
<div style="font-family:Helvetica,Arial,sans-serif;color:#004d40;font-size:17px;font-weight:bold;margin-bottom:14px;">Key Contacts</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td class="stack-col" width="50%" valign="top" style="padding:0 8px 16px 0;"><table role="presentation" width="100%" height="90" style="background-color:#f2f6f4;border-radius:8px;"><tr><td valign="top" style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;height:75px;">
<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.4px;color:#1e7a4c;font-weight:bold;">Manager</div>
<div style="font-size:14px;font-weight:bold;color:#004d40;margin-top:2px;">${manager}</div>
<div style="font-size:13px;color:#5b6b64;margin-top:1px;">${managerEmail}</div>
</td></tr></table></td>
<td class="stack-col" width="50%" valign="top" style="padding:0 0 16px 8px;"><table role="presentation" width="100%" height="90" style="background-color:#f2f6f4;border-radius:8px;"><tr><td valign="top" style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;height:75px;">
<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.4px;color:#1e7a4c;font-weight:bold;">IT Support</div>
<div style="font-size:14px;font-weight:bold;color:#004d40;margin-top:2px;">IT Helpdesk</div>
<div style="font-size:13px;color:#5b6b64;margin-top:1px;">it-support@apollo-gs.com</div>
</td></tr></table></td>
</tr>
<tr>
<td class="stack-col" width="50%" valign="top" style="padding:0 8px 0 0;"><table role="presentation" width="100%" height="90" style="background-color:#f2f6f4;border-radius:8px;"><tr><td valign="top" style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;height:75px;">
<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.4px;color:#1e7a4c;font-weight:bold;">HR</div>
<div style="font-size:14px;font-weight:bold;color:#004d40;margin-top:2px;">People & Operations</div>
<div style="font-size:13px;color:#5b6b64;margin-top:1px;">hr@apollo-gs.com</div>
</td></tr></table></td>
<td class="stack-col" width="50%" valign="top" style="padding:0 0 0 8px;"><table role="presentation" width="100%" height="90" style="background-color:#f2f6f4;border-radius:8px;"><tr><td valign="top" style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;height:75px;">
<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.4px;color:#1e7a4c;font-weight:bold;">Office Manager</div>
<div style="font-size:14px;font-weight:bold;color:#004d40;margin-top:2px;">Facilities & Logistics</div>
<div style="font-size:13px;color:#5b6b64;margin-top:1px;">office@apollo-gs.com</div>
</td></tr></table></td>
</tr>
</table></td></tr>

<tr><td align="center" style="background-color:#004d40;padding:22px 36px;border-radius:0 0 10px 10px;">
<div style="font-family:Helvetica,Arial,sans-serif;color:#fff;font-size:12px;opacity:0.85;line-height:1.6;">Apollo Green Solutions · Energy Management & Compliance<br>© 2026 Apollo Green Solutions. All rights reserved.</div>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

// ── Tool Definitions ──
const TOOLS = [
  {
    name: "send_onboarding_email",
    description: "Send a branded Apollo Green Solutions onboarding welcome email to a new employee. Generates a professional HTML email with company overview, first-week schedule, onboarding checklist, and key contacts.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "New employee's full name" },
        role: { type: "string", description: "Job title / role" },
        department: { type: "string", description: "Department name" },
        start_date: { type: "string", description: "Start date (e.g. 'July 21, 2026')" },
        manager: { type: "string", description: "Manager's full name" },
        to_email: { type: "string", description: "New employee's email address" },
      },
      required: ["name", "role", "department", "start_date", "manager", "to_email"],
    },
  },
];

// ── Handle MCP Messages ──
rl.on('line', async (line) => {
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return;
  }

  if (msg.method === 'initialize') {
    send({
      jsonrpc: '2.0',
      id: msg.id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'apollo-onboarding-email', version: '1.0.0' },
      },
    });
  } else if (msg.method === 'notifications/initialized') {
    // no response needed
  } else if (msg.method === 'tools/list') {
    send({
      jsonrpc: '2.0',
      id: msg.id,
      result: { tools: TOOLS },
    });
  } else if (msg.method === 'tools/call') {
    const { name: toolName, arguments: args } = msg.params;

    if (toolName === 'send_onboarding_email') {
      try {
        const managerEmail = args.manager.toLowerCase().replace(/\s+/g, '.') + '@apollo-gs.com';
        const dayDates = computeWeekDates(args.start_date);
        const html = buildEmailHtml(args.name, args.role, args.department, args.start_date, args.manager, managerEmail, dayDates);

        await transporter.sendMail({
          from: `"Apollo Green Solutions" <${process.env.SMTP_USER}>`,
          to: args.to_email,
          subject: `Welcome to Apollo Green Solutions — Your Onboarding Guide`,
          text: `Welcome to Apollo Green Solutions, ${args.name}! You're joining as ${args.role} in ${args.department}, starting ${args.start_date}.`,
          html: html,
        });

        send({
          jsonrpc: '2.0',
          id: msg.id,
          result: {
            content: [{ type: 'text', text: `✅ Onboarding email sent successfully to ${args.to_email}\n\nRecipient: ${args.name}\nRole: ${args.role}\nDepartment: ${args.department}\nStart Date: ${args.start_date}\nManager: ${args.manager}` }],
          },
        });
      } catch (err) {
        send({
          jsonrpc: '2.0',
          id: msg.id,
          result: {
            content: [{ type: 'text', text: `❌ Failed to send email: ${err.message}` }],
            isError: true,
          },
        });
      }
    }
  }
});
