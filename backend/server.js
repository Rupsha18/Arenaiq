const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/crowd", (req, res) => {
  res.json({
    northStand: Math.floor(Math.random() * 100),
    southStand: Math.floor(Math.random() * 100),
    eastStand: Math.floor(Math.random() * 100),
    westStand: Math.floor(Math.random() * 100)
  });
});

app.get("/alerts", (req, res) => {
  res.json([
    "High congestion in North Stand",
    "Gate 3 recommended",
    "Food court busy"
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
