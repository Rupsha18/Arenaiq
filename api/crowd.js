export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Simulates real-time crowd data (would connect to IoT sensors in production)
  const stands = ["North Stand", "South Stand", "East Block", "West Block", "VIP Lounge"];
  const data = stands.map(stand => ({
    stand,
    capacity: 5000,
    current: Math.floor(Math.random() * 5000),
    density: ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)],
    lastUpdated: new Date().toISOString()
  }));

  res.status(200).json({ success: true, timestamp: new Date().toISOString(), data });
}
