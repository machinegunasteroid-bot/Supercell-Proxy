const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({ status: "Supercell proxy online" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/test-ip", async (req, res) => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not detect IP" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Proxy listening on port ${PORT}`);
});
