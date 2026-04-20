const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/* ======================================================
   GLOBAL STATE (simulates real stadium data)
====================================================== */
let matchState = {
  minute: 65,
  totalCapacity: 66000
};

let zones = {
  northStand: 14000,
  southStand: 11000,
  eastStand: 12000,
  westStand: 9000
};

let alerts = [
  "High congestion in North Stand",
  "Gate 3 recommended for entry",
  "Food court wait time increasing"
];

/* ======================================================
   HELPER FUNCTIONS
====================================================== */

// simulate realistic crowd movement
function updateCrowd() {
  Object.keys(zones).forEach(zone => {
    let change = Math.floor((Math.random() - 0.4) * 500);
    zones[zone] = Math.max(1000, Math.min(16000, zones[zone] + change));
  });

  matchState.minute = Math.min(90, matchState.minute + Math.random() * 0.5);
}

// generate alerts dynamically
function updateAlerts() {
  const possibleAlerts = [
    "North Stand nearing full capacity",
    "East Gate queue increasing",
    "Security check delay at Gate 2",
    "Food Court overcrowded",
    "Exit Gate 4 recommended",
    "Medical assistance requested in West Block"
  ];

  if (Math.random() > 0.6) {
    const newAlert = possibleAlerts[Math.floor(Math.random() * possibleAlerts.length)];
    alerts.unshift(newAlert);
    if (alerts.length > 5) alerts.pop();
  }
}

// calculate total attendance
function getTotalAttendance() {
  return Object.values(zones).reduce((a, b) => a + b, 0);
}

/* ======================================================
   ROUTES
====================================================== */

// Health check
app.get("/", (req, res) => {
  res.send("ArenaIQ backend is running 🚀");
});

// Crowd API
app.get("/crowd", (req, res) => {
  updateCrowd();

  res.json({
    success: true,
    matchMinute: Math.floor(matchState.minute),
    totalAttendance: getTotalAttendance(),
    zones: zones
  });
});

// Alerts API
app.get("/alerts", (req, res) => {
  updateAlerts();

  res.json({
    success: true,
    count: alerts.length,
    alerts: alerts
  });
});

// Queue API (NEW - more realistic)
app.get("/queues", (req, res) => {
  const queues = [
    { location: "Gate A", wait: Math.floor(Math.random() * 20) },
    { location: "Gate B", wait: Math.floor(Math.random() * 15) },
    { location: "Food Court", wait: Math.floor(Math.random() * 25) },
    { location: "Restroom", wait: Math.floor(Math.random() * 10) }
  ];

  res.json({
    success: true,
    queues: queues
  });
});

// 🔥 AI Prediction API (IMPORTANT FOR RANK)
app.get("/prediction", (req, res) => {
  const zonesArr = Object.entries(zones);

  // find most crowded zone
  let maxZone = zonesArr.reduce((a, b) => (a[1] > b[1] ? a : b));

  res.json({
    success: true,
    nextPeakZone: maxZone[0],
    expectedInMinutes: Math.floor(Math.random() * 15) + 5,
    recommendation:
      maxZone[0] === "northStand"
        ? "Redirect crowd to Gate 2"
        : "Open additional entry points"
  });
});

// Backend status API
app.get("/status", (req, res) => {
  res.json({
    success: true,
    uptime: process.uptime(),
    message: "Server running smoothly",
    timestamp: new Date()
  });
});

/* ======================================================
   START SERVER
====================================================== */
app.listen(PORT, () => {
  console.log(`🚀 ArenaIQ backend running on port ${PORT}`);
});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
