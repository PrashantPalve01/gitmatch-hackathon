const express = require("express");
const { getProfile, getMetrics } = require("../controllers/github.controller");

const router = express.Router();

router.get("/profile/:username", getProfile);
router.get("/metrics/:username", getMetrics);

module.exports = router;
