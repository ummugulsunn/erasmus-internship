#!/usr/bin/env node

/**
 * Apollo Onboarding Email MCP Server
 * 
 * Gives Claude the ability to send branded onboarding emails.
 * Communicates via stdio (Model Context Protocol).
 * 
 * The email template is loaded from ../templates/onboarding_email_template.html
 * so there is a single source of truth for the email design.
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
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// ── Resolve template path (relative to this script) ──
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_PATH = resolve(__dirname, '..', 'templates', 'onboarding_email_template.html');

let emailTemplate;
try {
  emailTemplate = readFileSync(TEMPLATE_PATH, 'utf-8');
} catch (err) {
  process.stderr.write(`[apollo-onboarding] ERROR: Could not load email template from ${TEMPLATE_PATH}: ${err.message}\n`);
  process.exit(1);
}

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
  return emailTemplate
    .replace(/\{\{NAME\}\}/g, name)
    .replace(/\{\{ROLE\}\}/g, role)
    .replace(/\{\{DEPARTMENT\}\}/g, department)
    .replace(/\{\{START_DATE\}\}/g, startDate)
    .replace(/\{\{MANAGER\}\}/g, manager)
    .replace(/\{\{MANAGER_EMAIL\}\}/g, managerEmail)
    .replace(/\{\{DAY1_DATE\}\}/g, dayDates[0])
    .replace(/\{\{DAY2_DATE\}\}/g, dayDates[1])
    .replace(/\{\{DAY3_DATE\}\}/g, dayDates[2])
    .replace(/\{\{DAY4_DATE\}\}/g, dayDates[3])
    .replace(/\{\{DAY5_DATE\}\}/g, dayDates[4]);
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
