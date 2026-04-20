function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateData() {
  return {
    stats: {
      attendance: 67000 + random(-200, 200),
      avgWait: random(5, 18),
      flow: (2 + Math.random()).toFixed(2),
      alerts: random(2, 6),
    },

    zones: [
      { name: "North Stand", pct: random(85, 100) },
      { name: "South Stand", pct: random(50, 70) },
      { name: "East Stand", pct: random(70, 90) },
      { name: "West Stand", pct: random(40, 65) },
    ],

    alerts: [
      { msg: "Overcrowding at Gate 7", time: "Live" },
      { msg: "Food queue spike", time: "Live" },
      { msg: "Medical request", time: "Live" }
    ]
  };
}

module.exports = { generateData };
