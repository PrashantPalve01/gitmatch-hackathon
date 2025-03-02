import express from "express";

import { getProfile, getMetrics } from "../controllers/github.controller.js";

const router = express.Router();

router.get("/profile/:username", getProfile);
router.get("/metrics/:username", getMetrics);

export default router;
