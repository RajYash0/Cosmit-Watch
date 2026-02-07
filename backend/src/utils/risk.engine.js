const calculateRiskScore = (neo) => {
  let score = 0;

  // Hazardous asteroid
  if (neo.is_potentially_hazardous_asteroid) {
    score += 40;
  }

  // Diameter (km)
  const diameter =
    neo.estimated_diameter.kilometers.estimated_diameter_max;

  if (diameter > 1) score += 25;
  else if (diameter > 0.5) score += 15;
  else score += 5;

  // Closest approach
  const closeApproach = neo.close_approach_data?.[0];
  if (closeApproach) {
    const missDistance = Number(
      closeApproach.miss_distance.kilometers
    );
    const velocity = Number(
      closeApproach.relative_velocity.kilometers_per_hour
    );

    if (missDistance < 500000) score += 20;
    else if (missDistance < 2000000) score += 10;

    if (velocity > 50000) score += 15;
    else if (velocity > 25000) score += 8;
  }

  return Math.min(score, 100);
};

const getRiskLevel = (score) => {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
};

module.exports = {
  calculateRiskScore,
  getRiskLevel
};

const explainRisk = (neo) => {
  const reasons = [];

  if (neo.is_potentially_hazardous_asteroid) {
    reasons.push("Classified as potentially hazardous by NASA");
  }

  const diameter =
    neo.estimated_diameter.kilometers.estimated_diameter_max;
  if (diameter > 0.5) reasons.push("Large estimated diameter");

  const closeApproach = neo.close_approach_data?.[0];
  if (closeApproach) {
    const missDistance = Number(closeApproach.miss_distance.kilometers);
    const velocity = Number(
      closeApproach.relative_velocity.kilometers_per_hour
    );

    if (missDistance < 1000000)
      reasons.push("Very close Earth approach");

    if (velocity > 50000)
      reasons.push("High relative velocity");
  }

  return reasons.length ? reasons : ["Low-risk flyby"];
};

module.exports = {
  calculateRiskScore,
  getRiskLevel,
  explainRisk
};
