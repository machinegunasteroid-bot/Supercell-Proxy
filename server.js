const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({ status: "Supercell proxy online" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", async (req, res) => {
  try {
    const path = req.originalUrl.replace(/^\/api/, "");
    const url = `https://api.clashofclans.com/v1${path}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.SUPERCELL_API_KEY}`
      }
    });

    const text = await response.text();

    res.status(response.status).type("application/json").send(text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Proxy request failed" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Proxy listening on port ${PORT}`);
});
