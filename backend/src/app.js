const express = require("express");
const cors = require("cors");

const neoRoutes = require("./routes/neo.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/neo", neoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Astro-Track API running 🚀" });
});

module.exports = app;
