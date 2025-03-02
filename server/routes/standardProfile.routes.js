const express = require("express");
const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/standardProfile.controller");

const router = express.Router();

router.route("/").get(getProfiles).post(createProfile);

router.route("/:id").get(getProfile).put(updateProfile).delete(deleteProfile);

module.exports = router;
