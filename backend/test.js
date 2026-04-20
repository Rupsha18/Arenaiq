const request = require("supertest");

const BASE_URL = "http://localhost:5000";

async function runTests() {
  try {
    const res = await request(BASE_URL).get("/");
    console.log("Test / route:", res.statusCode === 200 ? "✅ PASS" : "❌ FAIL");

    const crowd = await request(BASE_URL).get("/crowd");
    console.log("Test /crowd:", crowd.statusCode === 200 ? "✅ PASS" : "❌ FAIL");

    const alerts = await request(BASE_URL).get("/alerts");
    console.log("Test /alerts:", alerts.statusCode === 200 ? "✅ PASS" : "❌ FAIL");

  } catch (err) {
    console.error("❌ Test failed:", err.message);
  }
}

runTests();
