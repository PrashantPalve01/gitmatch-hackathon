import express from "express";
import {
  createComparison,
  getComparisons,
  getComparison,
  deleteComparison,
} from "../controllers/comparison.controller.js";

const router = express.Router();

router.route("/").get(getComparisons).post(createComparison);

router.route("/:id").get(getComparison).delete(deleteComparison);

export default router;
