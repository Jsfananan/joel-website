# Workshop Waitlist — Google Sheet Setup (one-time, ~3 min)

The form at `/workshop-waitlist.html` posts Name, Email, and "Where are you in your AI journey?" to a Google Sheet you own, and emails you on every signup. Do this once, then paste the URL back to Alfred.

## Steps

1. Go to **https://sheets.new** — creates a blank Google Sheet. Name it **Workshop Waitlist**.
2. In that Sheet: **Extensions → Apps Script**.
3. Delete whatever's in the editor and paste the script below. Click the **save** icon.
4. Click **Deploy → New deployment**.
5. Click the gear next to "Select type" → choose **Web app**.
6. Set:
   - **Description:** waitlist
   - **Execute as:** Me (your account)
   - **Who has access:** **Anyone**  ← required so the public form can submit
7. Click **Deploy**. Click **Authorize access**, pick your Google account, allow the permissions (Google will warn it's unverified — it's your own script, click Advanced → Go to project → Allow).
8. Copy the **Web app URL** (ends in `/exec`).
9. **Paste that URL back to Alfred.** I'll drop it into the form and it goes live on next deploy.

Every submission then appends a row to the Sheet AND emails Joel@leadershipinchange.com.

## The script

```javascript
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Waitlist') || ss.insertSheet('Waitlist');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'AI Journey Stage', 'Source']);
    }
    var p = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow([new Date(), p.name || '', p.email || '', p.stage || '', p.source || '']);

    MailApp.sendEmail({
      to: 'Joel@leadershipinchange.com',
      subject: 'New workshop waitlist signup: ' + (p.name || 'Unknown'),
      body: 'Name: ' + (p.name || '') +
            '\nEmail: ' + (p.email || '') +
            '\nStage: ' + (p.stage || '') +
            '\nSource: ' + (p.source || '')
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Note on updates

If you ever edit the script, you must **Deploy → Manage deployments → edit → Version: New version → Deploy** for changes to take effect. The `/exec` URL stays the same.
