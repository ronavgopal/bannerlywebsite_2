/**
 * Bannerly form responses → Google Sheets.
 *
 * Writes to the "Bannerly Form Responses" spreadsheet and is deployed as a web app.
 * The website (src/bannerly/actions.ts) posts each form submission here as JSON:
 *   { form: "<form kind>", submittedAt: "<ISO date>", fields: { ... } }
 * Each form gets its own tab with a formatted header row. Nonprofit applications
 * and volunteer sign-ups also get a confirmation email (see EMAILS below).
 *
 * Setup: run setup() once, deploy as a web app (Execute as: Me,
 * Who has access: Anyone), then set FORMS_WEBHOOK_URL in Vercel to the
 * web app URL.
 */

/** ID of the "Bannerly Form Responses" spreadsheet (from its URL). */
const SHEET_ID = "1A9ogPhHsyiIczzPMaz-fMCDSATrX8MNZVEG9oSIjjts";

const FORMS = {
  "nonprofit-application": {
    tab: "Nonprofit Applications",
    columns: [
      ["submittedAt", "Submitted"],
      ["organization", "Organization"],
      ["name", "Contact name"],
      ["email", "Email"],
      ["website", "Website / social"],
      ["mission", "Mission"],
      ["audience", "Audience"],
      ["goals", "Goals"],
      ["package", "Package"],
      ["brandAssets", "Brand assets"],
    ],
  },
  "volunteer-signup": {
    tab: "Volunteer Sign-ups",
    columns: [
      ["submittedAt", "Submitted"],
      ["name", "Name"],
      ["email", "Email"],
      ["background", "Background"],
      ["skills", "Skills"],
      ["tools", "Tools"],
      ["portfolio", "Portfolio"],
      ["hours", "Hours per month"],
      ["serviceHours", "Service hours tracked?"],
    ],
  },
  "sponsor-inquiry": {
    tab: "Sponsor Inquiries",
    columns: [
      ["submittedAt", "Submitted"],
      ["organization", "Business / organization"],
      ["name", "Contact name"],
      ["email", "Email"],
      ["interest", "Interested in"],
      ["message", "Message"],
    ],
  },
  newsletter: {
    tab: "Newsletter",
    columns: [
      ["submittedAt", "Submitted"],
      ["email", "Email"],
    ],
  },
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const form = FORMS[data.form];
    if (!form) return json_({ ok: false, error: "unknown form" });

    const fields = data.fields || {};
    const row = form.columns.map(([id]) => {
      if (id === "submittedAt") return new Date(data.submittedAt || Date.now());
      return safe_(fields[id]);
    });
    sheet_(form).appendRow(row);
    sendConfirmation_(data.form, fields);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/** Creates every tab with its header row. Run once from the editor. */
function setup() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  Object.values(FORMS).forEach(sheet_);
  const blank = ss.getSheetByName("Sheet1");
  if (blank && blank.getLastRow() === 0) ss.deleteSheet(blank);
}

function sheet_(form) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(form.tab);
  if (sheet) return sheet;

  sheet = ss.insertSheet(form.tab);
  const headers = form.columns.map(([, label]) => label);
  sheet
    .getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight("bold")
    .setBackground("#74151C")
    .setFontColor("#F4EEDA")
    .setVerticalAlignment("middle");
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);
  sheet.setColumnWidths(1, headers.length, 200);
  sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd h:mm am/pm");
  sheet
    .getRange(2, 1, sheet.getMaxRows() - 1, headers.length)
    .setWrap(true)
    .setVerticalAlignment("top");
  return sheet;
}

/**
 * Confirmation emails, sent from the account that deployed this script.
 * Each template is a subject plus paragraphs; a paragraph that is an array
 * becomes a numbered list.
 */
const EMAILS = {
  "nonprofit-application": (f) => ({
    subject: "Welcome to Bannerly – We received your application!",
    paragraphs: [
      `Hi ${f.name},`,
      `Thank you for applying to Bannerly! We’re excited that ${f.organization} is interested in free digital marketing support.`,
      "Here’s what happens next:",
      [
        "Our team will review your application within 2–3 business days.",
        "If it’s a good fit, we’ll match you with a volunteer creator.",
        "You’ll receive a kickoff email with next steps and a shared folder for your brand assets.",
      ],
      "In the meantime, feel free to reply to this email with any questions or additional brand materials (logo, colors, fonts, or current social links).",
      "Every cause deserves a banner — we’re glad you’re raising yours with us.",
    ],
  }),
  "volunteer-signup": (f) => ({
    subject: "Welcome to Bannerly – Thanks for signing up to volunteer!",
    paragraphs: [
      `Hi ${f.name},`,
      "Thank you for joining Bannerly! We’re excited to connect your design and marketing skills with small nonprofits that need free content support.",
      "Here’s what happens next:",
      [
        "We’ll review your profile and skills.",
        "You’ll receive an onboarding pack with templates, guidelines, and how to log hours.",
        "We’ll match you with a nonprofit based on your skills and availability.",
      ],
      "In the meantime, make sure your portfolio or sample work is up to date (reply with a link if you haven’t shared one yet).",
      "You’ll earn real portfolio pieces, service hours, and the chance for LinkedIn recommendations. Welcome aboard!",
    ],
  }),
};

const SIGN_OFF = ["Best regards,", "The Bannerly Team", "bannerly.org | @bannerlyorg"];

function sendConfirmation_(kind, fields) {
  const template = EMAILS[kind];
  if (!template || !fields.email) return;
  const f = {
    name: String(fields.name || "there").trim(),
    organization: String(fields.organization || "your organization").trim(),
  };
  const { subject, paragraphs } = template(f);

  const text = paragraphs
    .map((p) => (Array.isArray(p) ? p.map((item, i) => `${i + 1}. ${item}`).join("\n") : p))
    .concat(SIGN_OFF.join("\n"))
    .join("\n\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#2b1a1b;max-width:560px">${paragraphs
    .map((p) =>
      Array.isArray(p)
        ? `<ol style="margin:0 0 16px;padding-left:22px">${p.map((item) => `<li>${esc_(item)}</li>`).join("")}</ol>`
        : `<p style="margin:0 0 16px">${esc_(p)}</p>`,
    )
    .join("")}<p style="margin:24px 0 0">${SIGN_OFF.map(esc_).join("<br>")}</p></div>`;

  try {
    MailApp.sendEmail({
      to: String(fields.email).trim(),
      cc: Session.getEffectiveUser().getEmail(), // a copy for the Bannerly inbox
      subject,
      body: text,
      htmlBody: html,
      name: "Bannerly",
    });
  } catch (err) {
    // The response is already saved in the sheet; a failed email shouldn't fail the form.
    console.error("Confirmation email failed: " + err);
  }
}

function esc_(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

/** Sends both confirmation emails to you so you can check how they look. Run from the editor. */
function testEmails() {
  const me = Session.getEffectiveUser().getEmail();
  sendConfirmation_("nonprofit-application", { name: "Test Contact", organization: "Test Nonprofit", email: me });
  sendConfirmation_("volunteer-signup", { name: "Test Volunteer", email: me });
}

/** Stops submitted text from being read as a spreadsheet formula. */
function safe_(value) {
  if (value === undefined || value === null) return "";
  const text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
