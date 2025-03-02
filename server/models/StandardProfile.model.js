const mongoose = require("mongoose");

const StandardProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  metrics: {
    commit_frequency: {
      min: Number,
      optimal: Number,
    },
    language_requirements: [
      {
        language: String,
        proficiency: Number, // percentage from 0-100
      },
    ],
    repository_count: {
      min: Number,
    },
    stars_received: {
      min: Number,
    },
    fork_count: {
      min: Number,
    },
    code_quality_estimate: {
      min: Number,
    },
  },
  weights: {
    commit_frequency: {
      type: Number,
      default: 1,
    },
    language_match: {
      type: Number,
      default: 1,
    },
    repository_count: {
      type: Number,
      default: 1,
    },
    stars_received: {
      type: Number,
      default: 1,
    },
    fork_count: {
      type: Number,
      default: 1,
    },
    code_quality_estimate: {
      type: Number,
      default: 1,
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StandardProfile", StandardProfileSchema);
