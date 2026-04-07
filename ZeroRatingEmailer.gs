// Zero Rating Pending Notifier

function sendPendingZeroRatingEmail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Telecom Activation List");
  const data = sheet.getDataRange().getValues();

  const pendingRows = [];
  for (let i = 1; i < data.length; i++) {
    const status = String(data[i][5]).trim(); // Column F
    if (status === "Pending") {
      pendingRows.push({
        no:     data[i][0],
        date:   formatDate(data[i][1]),
        number: data[i][3],
      });
    }
  }

  if (pendingRows.length === 0) {
    Logger.log("No pending entries. Email not sent.");
    return;
  }

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric"
  });

  const subject = `Action Required: Pending Zero Rating Activations — ${today}`;

  const htmlBody = `
  <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#222">
    <div style="background:#185FA5;padding:20px 28px;border-radius:10px 10px 0 0">
      <h2 style="color:#fff;margin:0;font-size:18px">Zero Rating — Pending Activation Notice</h2>
      <p style="color:#B5D4F4;margin:4px 0 0;font-size:13px">Generated automatically at 12:00 AM · ${today}</p>
    </div>
    <div style="border:1px solid #ddd;border-top:none;border-radius:0 0 10px 10px;padding:24px 28px">
      <p>Dear Roshan Team,</p>
      <p>I hope this message finds you well. As of today, there are <strong>${pendingRows.length} number(s)</strong> submitted to our system that are <strong>not yet activated</strong> on the Zero Rating package. We kindly request that these be added to the system at your earliest convenience.</p>
      <p>Please prioritize the activation of these numbers so our users can benefit from the Zero Rating service without further delay.</p>
      <p>📋 <a href="https://docs.google.com/spreadsheets/d/1d4sXSDfF45iHlsqFljpAU94_uyqbruyzOvosirUwNN4/edit?gid=1635622162#gid=1635622162" style="color:#185FA5">View the full sheet here</a></p>
      <p>Thank you for your continued support and cooperation.</p>
      <p style="margin-top:24px">Warm regards,<br>
        <strong>Shams Haqyar — Lead Technology</strong><br>
        <span style="font-size:12px;color:#999">This email was generated automatically. Do not reply.</span>
      </p>
    </div>
  </div>`;

  GmailApp.sendEmail(
    "example",
    subject,
    "Please view this email in HTML format.",
    {
      cc:       "example",
      htmlBody: htmlBody,
      name:     "Zero Rating System"
    }
  );

  Logger.log(`Email sent. ${pendingRows.length} pending number(s) reported.`);
}

function formatDate(val) {
  if (!val) return "";
  const d = new Date(val);
  return d.toLocaleDateString("en-GB", { day:"2-digit", month:"2-digit", year:"numeric" });
}

function createMidnightTrigger() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === "sendPendingZeroRatingEmail")
      ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("sendPendingZeroRatingEmail")
    .timeBased()
    .atHour(0)
    .everyDays(1)
    .create();
  Logger.log("Midnight trigger created successfully.");
}
