const mongoose = require("mongoose");

const GitHubMetricsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  commit_frequency: {
    type: Number,
    required: true,
  },
  repository_count: {
    type: Number,
    required: true,
  },
  stars_received: {
    type: Number,
    required: true,
  },
  fork_count: {
    type: Number,
  },
  language_breakdown: {
    type: Map,
    of: Number,
  },
  code_quality_estimate: {
    type: Number,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GitHubMetrics", GitHubMetricsSchema);
