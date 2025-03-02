const express = require("express");
const {
  createComparison,
  getComparisons,
  getComparison,
  deleteComparison,
} = require("../controllers/comparison.controller");

const router = express.Router();

router.route("/").get(getComparisons).post(createComparison);

router.route("/:id").get(getComparison).delete(deleteComparison);

module.exports = router;
