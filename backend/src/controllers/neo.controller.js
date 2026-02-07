const nasaService = require("../services/nasa.service");

const fetchTodayNEOs = async (req, res) => {
  try {
    const data = await nasaService.getTodayNEOs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch NEO data" });
  }
};

const fetchAsteroidById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await nasaService.getAsteroidById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch asteroid details" });
  }
};

module.exports = {
  fetchTodayNEOs,
  fetchAsteroidById
};
