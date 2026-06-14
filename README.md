# student-form
Interactive Bulgarian-language project preference form for the Lesto × ППМГ Враца 2026 student initiative. Multi-step HTML/JS survey for collecting student skills and project interests across 6 teams.

## Running Locally

**Simple option — no form submission needed:**

Open `index.html` directly in your browser.

**With a static file server:**

```bash
python -m http.server 8000
# or
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000).

**With full form submission to Google Sheets:**

Follow the steps below to set up your `GOOGLE_APP_URL`, then run:

```bash
vercel dev
```

---

## Setting Up Google Sheets Integration

### Step 1 — Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and sign in with your Google account.
2. Click **+ Blank** to create a new spreadsheet.
3. Give it a name, e.g. `Student Form Responses`.

### Step 2 — Open Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**.
2. A new tab opens with a code editor. Delete the default `myFunction()` code.

### Step 3 — Paste the Script

Copy the entire contents of `google-apps-script.js` from this project and paste it into the editor, then save (`Ctrl+S`).

### Step 4 — Deploy as Web App

1. Click **Deploy → New deployment** (top right).
2. Click the gear icon next to **Type** and select **Web app**.
3. Set the following:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone` ← required for the form to post data
4. Click **Deploy**.
5. Authorize the app when prompted — choose your Google account and click **Allow**.
6. Copy the **Web app URL** that appears (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 5 — Configure the Environment Variable

Create a `.env` file in the project root (based on `.env.example`):

```
GOOGLE_APP_URL=https://script.google.com/macros/s/AKfycb.../exec
```

Paste your copied URL as the value.

---

## Deployment

Hosted on Vercel. Deploy manually via:

```bash
vercel --prod
```
