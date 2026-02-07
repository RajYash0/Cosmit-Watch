const axios = require("axios");

const NASA_BASE_URL = "https://api.nasa.gov/neo/rest/v1";
const API_KEY = process.env.NASA_API_KEY;

const getTodayNEOs = async () => {
  const today = new Date().toISOString().split("T")[0];

  const response = await axios.get(`${NASA_BASE_URL}/feed`, {
    params: {
      start_date: today,
      end_date: today,
      api_key: API_KEY
    }
  });

  return response.data;
};

const getAsteroidById = async (id) => {
  const response = await axios.get(`${NASA_BASE_URL}/neo/${id}`, {
    params: { api_key: API_KEY }
  });
  return response.data;
};

module.exports = {
  getTodayNEOs,
  getAsteroidById
};
