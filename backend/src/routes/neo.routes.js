const express = require("express");
const router = express.Router();
const neoController = require("../controllers/neo.controller");

router.get("/feed", neoController.fetchTodayNEOs);
router.get("/:id", neoController.fetchAsteroidById);

module.exports = router;
