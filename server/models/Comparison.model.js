const mongoose = require("mongoose");

const ComparisonSchema = new mongoose.Schema({
  candidate_username: {
    type: String,
    required: true,
    trim: true,
  },
  standard_profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StandardProfile",
    required: true,
  },
  result: {
    overall_score: {
      type: Number,
      required: true,
    },
    recommendation: {
      type: String,
      enum: ["Hire", "No Hire", "Consider"],
      required: true,
    },
    metrics_breakdown: {
      type: Map,
      of: {
        score: Number,
        weight: Number,
        description: String,
      },
    },
    strengths: [String],
    weaknesses: [String],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comparison", ComparisonSchema);
