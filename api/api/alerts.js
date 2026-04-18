export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const alerts = [
    { id: 1, type: "CRITICAL", zone: "North Stand Gate 3", message: "Crowd density exceeded 90% — diversion route activated", time: new Date(Date.now() - 120000).toISOString() },
    { id: 2, type: "WARNING",  zone: "Concession Stand B", message: "Wait time prediction: 18 mins at halftime — deploy 2 extra staff", time: new Date(Date.now() - 300000).toISOString() },
    { id: 3, type: "INFO",     zone: "Exit Gate 7",        message: "Early exit surge predicted in 12 minutes — open auxiliary exits", time: new Date(Date.now() - 60000).toISOString() },
    { id: 4, type: "AI",       zone: "West Block",         message: "AI Recommendation: Redirect 800 fans via internal walkway C to reduce Gate 3 pressure", time: new Date().toISOString() }
  ];

  res.status(200).json({ success: true, count: alerts.length, alerts });
}
