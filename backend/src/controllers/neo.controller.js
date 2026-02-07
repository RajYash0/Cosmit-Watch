const nasaService = require("../services/nasa.service");
const {
  calculateRiskScore,
  getRiskLevel,
  explainRisk
} = require("../utils/risk.engine");

const fetchTodayNEOs = async (req, res) => {
  console.log("🔥 FEED CONTROLLER HIT");
  try {
    const data = await nasaService.getTodayNEOs();
    const date = Object.keys(data.near_earth_objects)[0];

    const enriched = data.near_earth_objects[date].map((neo) => {
      const score = calculateRiskScore(neo);
      return {
        ...neo,
        riskScore: score,
        riskLevel: getRiskLevel(score),
        riskExplanation: explainRisk(neo)
      };
    });
    
enriched.sort((a, b) => b.riskScore - a.riskScore);

    res.json(enriched);
  } catch (error) {
    console.error("FEED ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch NEO data" });
  }
};

const fetchAsteroidById = async (req, res) => {
  console.log("🚨 ID CONTROLLER HIT:", req.params.id);
  try {
    const neo = await nasaService.getAsteroidById(req.params.id);
    const score = calculateRiskScore(neo);

    res.json({
      ...neo,
      riskScore: score,
      riskLevel: getRiskLevel(score)
    });
  } catch (error) {
    console.error("ID ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch asteroid details" });
  }
};


module.exports = {
  fetchTodayNEOs,
  fetchAsteroidById
};
