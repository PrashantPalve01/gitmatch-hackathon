import mongoose from "mongoose";

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
  user_id: {
    type: String, // Firebase UID is a string
    required: true,
    index: true, // Add an index for faster queries
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

export default mongoose.model("Comparison", ComparisonSchema);
