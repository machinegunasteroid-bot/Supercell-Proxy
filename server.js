const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({ status: "Supercell proxy online" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Proxy listening on port ${PORT}`);
});
