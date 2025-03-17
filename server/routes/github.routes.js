import express from "express";

import { getProfile } from "../controllers/github.controller.js";

const router = express.Router();

router.get("/profile/:username", getProfile);

export default router;
