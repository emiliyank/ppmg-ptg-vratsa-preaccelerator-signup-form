module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sheetUrl = process.env.GOOGLE_APP_URL;
  console.log("GOOGLE_APP_URL present:", !!sheetUrl);
  if (!sheetUrl) {
    console.error("GOOGLE_APP_URL is not set");
    return res.status(500).json({ error: "GOOGLE_APP_URL not configured" });
  }

  try {
    const body = JSON.stringify(req.body);

    // Google Apps Script web app URLs respond with a 302 redirect.
    // Following a 302 with fetch converts POST → GET, so doPost() is never called.
    // Instead: follow the redirect manually and re-POST to the resolved URL.
    const probe = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      redirect: "manual",
    });

    let targetUrl = sheetUrl;
    if (probe.status >= 300 && probe.status < 400) {
      targetUrl = probe.headers.get("location") || sheetUrl;
      console.log("Following redirect to:", targetUrl);
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const text = await response.text();
    console.log("Google response status:", response.status, "body:", text.slice(0, 200));

    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!response.ok) {
      return res.status(500).json({ error: "Google Sheets rejected request", detail: data });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Sheet submission failed:", err.message);
    return res.status(500).json({ error: "Failed to submit", detail: err.message });
  }
};
