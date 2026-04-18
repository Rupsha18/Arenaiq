export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const queues = [
    { location: "Gate A", type: "Entry Gate",    waitMinutes: Math.floor(Math.random() * 15), staffCount: 4 },
    { location: "Gate B", type: "Entry Gate",    waitMinutes: Math.floor(Math.random() * 10), staffCount: 3 },
    { location: "Food Court 1", type: "Food",    waitMinutes: Math.floor(Math.random() * 20), staffCount: 6 },
    { location: "Food Court 2", type: "Food",    waitMinutes: Math.floor(Math.random() * 25), staffCount: 5 },
    { location: "Restroom Block A", type: "Restroom", waitMinutes: Math.floor(Math.random() * 8), staffCount: 2 },
    { location: "Merchandise", type: "Retail",   waitMinutes: Math.floor(Math.random() * 12), staffCount: 3 }
  ];

  res.status(200).json({ success: true, predictedHalftimeSurge: true, queues });
}
