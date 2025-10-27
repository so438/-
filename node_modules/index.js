import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ API Proxy server is running on Vercel!");
});

app.get("/api", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: { "User-Agent": "Vercel-Proxy-Server/1.0" },
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});

export default app;
