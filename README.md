# zero-rating-notifier

Automated Google Apps Script that monitors a Google Sheet for pending Zero Rating numbers and sends a formatted email report to telecom daily at midnight.

---

## What it does

- Scans a Google Sheet for any Roshan numbers with **Pending** status in the Status column
- Sends a professional HTML email to the Roshan team every night at **12:00 AM**
- Skips sending if there are no pending numbers that night
- Includes a full table of pending numbers with submission dates and a direct link to the sheet

---

## Recipients

| Role | Email |
|------|-------|

---

## Setup

### 1. Open the script editor

In your Google Sheet, go to **Extensions → Apps Script**.

### 2. Paste the script

Delete any existing code, paste the contents of `ZeroRatingEmailer.gs`, and save.

### 3. Update the sheet name

On line 7, change `"Sheet1"` to match your actual tab name:

```js
const sheet = ss.getSheetByName("telecom Numbers for Zero Rating");
```

### 4. Add your sheet link

Find the line below and replace the URL with your actual Google Sheet link:

```js
<a href="https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID">View the full sheet here</a>
```

### 5. Create the midnight trigger

In the Apps Script editor, select `createMidnightTrigger` from the function dropdown and click **Run**. Grant the required permissions when prompted.

### 6. Test it

Select `sendPendingZeroRatingEmail` from the dropdown and click **Run** to send a test email immediately.

### 7. Verify the trigger

Click the clock icon (Triggers) in the left sidebar — you should see `sendPendingZeroRatingEmail` listed as a daily trigger firing at midnight.

---

## File structure

```
zero-rating-notifier/
├── ZeroRatingEmailer.gs   # Main Apps Script file
└── README.md
```

---

## How the script works

1. Reads all rows from the configured sheet
2. Filters rows where column F (Status) equals `"Pending"`
3. If no pending rows exist, logs a message and exits without sending
4. Builds a formatted HTML email with a table of all pending numbers
5. Sends via `GmailApp.sendEmail()` with To and CC recipients

---

## Notes

- The script must be bound to the Google Sheet (opened via Extensions → Apps Script from within the sheet)
- The Google account running the script must have Gmail send permissions
- Trigger timezone follows the Google Apps Script project timezone — set it under **Project Settings** if needed
- Run `createMidnightTrigger` only once; re-running it will delete and recreate the trigger to avoid duplicates

---

## Maintained by

Shams Haqyar
