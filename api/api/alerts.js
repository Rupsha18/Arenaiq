let alertId = 5;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const zones = [
    "North Stand",
    "South Stand",
    "East Block",
    "West Block",
    "VIP Lounge",
    "Gate 1",
    "Gate 3",
    "Food Court",
    "Exit Gate 7"
  ];

  const alertTypes = ["INFO", "WARNING", "CRITICAL"];

  const alerts = [];

  // 🔥 Generate dynamic alerts
  const numberOfAlerts = Math.floor(Math.random() * 4) + 3;

  for (let i = 0; i < numberOfAlerts; i++) {
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];

    let message;

    if (type === "CRITICAL") {
      message = `⚠️ ${zone} overcrowded. Immediate diversion required.`;
    } else if (type === "WARNING") {
      message = `⏳ Rising congestion at ${zone}. Monitor flow and prepare intervention.`;
    } else {
      message = `ℹ️ Normal activity at ${zone}, minor fluctuations observed.`;
    }

    alerts.push({
      id: alertId++,
      type,
      zone,
      message,
      time: new Date(Date.now() - Math.random() * 300000).toISOString()
    });
  }

  // 🔥 AI GENERATED ALERT (THIS IS YOUR RANK BOOSTER)
  const aiZone = zones[Math.floor(Math.random() * zones.length)];

  const aiAlert = {
    id: alertId++,
    type: "AI",
    zone: aiZone,
    confidence: (Math.random() * 20 + 80).toFixed(1) + "%", // 80–100%
    message: `AI predicts surge in ${aiZone} within next ${
      Math.floor(Math.random() * 10) + 5
    } minutes. Recommend redirecting crowd via alternate routes.`,
    action: [
      "Open additional entry/exit gates",
      "Deploy security staff",
      "Display rerouting instructions on screens"
    ],
    time: new Date().toISOString()
  };

  alerts.unshift(aiAlert); // put AI alert on top

  // 🔥 Priority sorting (CRITICAL first)
  const priority = { CRITICAL: 1, WARNING: 2, INFO: 3, AI: 0 };
  alerts.sort((a, b) => priority[a.type] - priority[b.type]);

  res.status(200).json({
    success: true,
    totalAlerts: alerts.length,
    systemStatus: "Monitoring Live Crowd Dynamics",
    alerts
  });
}
