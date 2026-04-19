const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// IMPORTANT: Render needs this
const PORT = process.env.PORT || 5000;

// Home route (for testing)
app.get("/", (req, res) => {
  res.send("ArenaIQ backend is running 🚀");
});

// Crowd data API
app.get("/crowd", (req, res) => {
  const data = {
    northStand: Math.floor(Math.random() * 100),
    southStand: Math.floor(Math.random() * 100),
    eastStand: Math.floor(Math.random() * 100),
    westStand: Math.floor(Math.random() * 100)
  };
  res.json(data);
});

// Alerts API
app.get("/alerts", (req, res) => {
  const alerts = [
    "High congestion in North Stand",
    "Gate 3 recommended for entry",
    "Food court wait time increasing"
  ];
  res.json(alerts);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
