/**
 * Bannerly form responses → Google Sheets.
 *
 * Bound to the "Bannerly Form Responses" spreadsheet and deployed as a web app.
 * The website (src/bannerly/actions.ts) posts each form submission here as JSON:
 *   { form: "<form kind>", submittedAt: "<ISO date>", fields: { ... } }
 * Each form gets its own tab with a formatted header row.
 *
 * Setup: run setup() once, deploy as a web app (Execute as: Me,
 * Who has access: Anyone), then set FORMS_WEBHOOK_URL in Vercel to the
 * web app URL.
 */

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
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/** Creates every tab with its header row. Run once from the editor. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.values(FORMS).forEach(sheet_);
  const blank = ss.getSheetByName("Sheet1");
  if (blank && blank.getLastRow() === 0) ss.deleteSheet(blank);
}

function sheet_(form) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
