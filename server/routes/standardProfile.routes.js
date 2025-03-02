import express from "express";

import {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/standardProfile.controller.js";

const router = express.Router();

router.route("/").get(getProfiles).post(createProfile);

router.route("/:id").get(getProfile).put(updateProfile).delete(deleteProfile);

export default router;
