let matchMinute = 60;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Simulate match progression
  matchMinute = Math.min(90, matchMinute + Math.random() * 0.8);

  const stands = [
    { name: "North Stand", base: 4200 },
    { name: "South Stand", base: 3500 },
    { name: "East Block", base: 3800 },
    { name: "West Block", base: 3000 },
    { name: "VIP Lounge", base: 1200 }
  ];

  const data = stands.map((stand) => {
    // simulate realistic fluctuation
    const variation = Math.floor((Math.random() - 0.4) * 600);
    const current = Math.max(500, Math.min(5000, stand.base + variation));

    const capacity = 5000;
    const occupancyRate = current / capacity;

    let density;
    let risk;

    if (occupancyRate < 0.4) {
      density = "Low";
      risk = "Safe";
    } else if (occupancyRate < 0.7) {
      density = "Medium";
      risk = "Watch";
    } else if (occupancyRate < 0.9) {
      density = "High";
      risk = "Crowded";
    } else {
      density = "Critical";
      risk = "Overload";
    }

    return {
      stand: stand.name,
      capacity,
      current,
      occupancyRate: Number((occupancyRate * 100).toFixed(1)),
      density,
      risk,
      trend: Math.random() > 0.5 ? "Increasing" : "Decreasing",
      lastUpdated: new Date().toISOString()
    };
  });

  // 🔥 AI-style insight (THIS BOOSTS YOUR PROJECT VALUE)
  const mostCrowded = data.reduce((a, b) =>
    a.occupancyRate > b.occupancyRate ? a : b
  );

  const aiInsight = {
    hotspot: mostCrowded.stand,
    predictedPeakInMinutes: Math.floor(Math.random() * 10) + 5,
    recommendation:
      mostCrowded.density === "Critical"
        ? `Redirect crowd away from ${mostCrowded.stand}`
        : `Monitor ${mostCrowded.stand} for rising congestion`
  };

  res.status(200).json({
    success: true,
    matchMinute: Math.floor(matchMinute),
    totalCrowd: data.reduce((sum, s) => sum + s.current, 0),
    aiInsight,   // ⭐ VERY IMPORTANT
    data
  });
}
