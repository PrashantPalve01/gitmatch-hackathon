const Comparison = require("../models/Comparison.model.js");
const StandardProfile = require("../models/StandardProfile.model");
const GitHubMetrics = require("../models/GitHubMetrics.model");
const githubService = require("../services/github.service");

// Compare function
const compareToStandard = (metrics, standardProfile) => {
  const result = {
    overall_score: 0,
    metrics_breakdown: {},
    strengths: [],
    weaknesses: [],
  };

  let totalWeight = 0;
  let weightedScore = 0;

  // Commit frequency
  if (standardProfile.metrics.commit_frequency) {
    const weight = standardProfile.weights.commit_frequency || 1;
    totalWeight += weight;

    const score = Math.min(
      100,
      (metrics.commit_frequency /
        standardProfile.metrics.commit_frequency.optimal) *
        100
    );

    weightedScore += score * weight;

    result.metrics_breakdown.commit_frequency = {
      score,
      weight,
      description: `${metrics.commit_frequency.toFixed(
        1
      )} commits per repo (optimal: ${
        standardProfile.metrics.commit_frequency.optimal
      })`,
    };

    if (score >= 80) {
      result.strengths.push("Consistent commit activity");
    } else if (score < 50) {
      result.weaknesses.push("Low commit frequency");
    }
  }

  // Repository count
  if (standardProfile.metrics.repository_count) {
    const weight = standardProfile.weights.repository_count || 1;
    totalWeight += weight;

    const score = Math.min(
      100,
      (metrics.repository_count /
        standardProfile.metrics.repository_count.min) *
        100
    );

    weightedScore += score * weight;

    result.metrics_breakdown.repository_count = {
      score,
      weight,
      description: `${metrics.repository_count} repositories (min: ${standardProfile.metrics.repository_count.min})`,
    };

    if (score >= 80) {
      result.strengths.push("Good portfolio of projects");
    } else if (score < 50) {
      result.weaknesses.push("Limited number of public repositories");
    }
  }

  // Stars received
  if (standardProfile.metrics.stars_received) {
    const weight = standardProfile.weights.stars_received || 1;
    totalWeight += weight;

    const score = Math.min(
      100,
      (metrics.stars_received / standardProfile.metrics.stars_received.min) *
        100
    );

    weightedScore += score * weight;

    result.metrics_breakdown.stars_received = {
      score,
      weight,
      description: `${metrics.stars_received} stars received (min: ${standardProfile.metrics.stars_received.min})`,
    };

    if (score >= 80) {
      result.strengths.push("Projects have good community recognition");
    } else if (score < 50) {
      result.weaknesses.push("Limited project popularity");
    }
  }

  // Language requirements
  if (
    standardProfile.metrics.language_requirements &&
    standardProfile.metrics.language_requirements.length > 0
  ) {
    const weight = standardProfile.weights.language_match || 1;
    totalWeight += weight;

    let matchScore = 0;
    let languages = [];

    standardProfile.metrics.language_requirements.forEach((req) => {
      const langBytes = metrics.language_breakdown[req.language] || 0;
      const totalBytes = Object.values(metrics.language_breakdown).reduce(
        (sum, val) => sum + val,
        0
      );

      const percentage = totalBytes > 0 ? (langBytes / totalBytes) * 100 : 0;
      const match = Math.min(100, (percentage / req.proficiency) * 100);

      matchScore += match * (req.proficiency / 100);

      languages.push(
        `${req.language}: ${percentage.toFixed(1)}% (required: ${
          req.proficiency
        }%)`
      );
    });

    const score = matchScore;
    weightedScore += score * weight;

    result.metrics_breakdown.language_match = {
      score,
      weight,
      description: `Language match: ${languages.join(", ")}`,
    };

    if (score >= 80) {
      result.strengths.push("Strong match with required programming languages");
    } else if (score < 50) {
      result.weaknesses.push(
        "Limited experience with required programming languages"
      );
    }
  }

  // Code quality
  if (standardProfile.metrics.code_quality_estimate) {
    const weight = standardProfile.weights.code_quality_estimate || 1;
    totalWeight += weight;

    const score = Math.min(
      100,
      (metrics.code_quality_estimate /
        standardProfile.metrics.code_quality_estimate.min) *
        100
    );

    weightedScore += score * weight;

    result.metrics_breakdown.code_quality_estimate = {
      score,
      weight,
      description: `Quality score: ${metrics.code_quality_estimate.toFixed(
        1
      )} (min: ${standardProfile.metrics.code_quality_estimate.min})`,
    };

    if (score >= 80) {
      result.strengths.push("High quality codebase");
    } else if (score < 50) {
      result.weaknesses.push("Improvements needed in code quality");
    }
  }

  // Calculate overall score
  result.overall_score = totalWeight > 0 ? weightedScore / totalWeight : 0;

  // Determine recommendation
  if (result.overall_score >= 75) {
    result.recommendation = "Hire";
  } else if (result.overall_score >= 50) {
    result.recommendation = "Consider";
  } else {
    result.recommendation = "No Hire";
  }

  return result;
};

// Create new comparison
exports.createComparison = async (req, res) => {
  try {
    const { candidate_username, standard_profile_id } = req.body;

    // Validate request
    if (!candidate_username || !standard_profile_id) {
      return res.status(400).json({
        success: false,
        error: "Please provide username and standard profile ID",
      });
    }

    // Get standard profile
    const standardProfile = await StandardProfile.findById(standard_profile_id);

    if (!standardProfile) {
      return res.status(404).json({
        success: false,
        error: "Standard profile not found",
      });
    }

    // Get or calculate GitHub metrics
    let metrics = await GitHubMetrics.findOne({
      username: candidate_username,
      updated_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Less than 24 hours old
    });

    if (!metrics) {
      // Calculate new metrics
      const calculatedMetrics = await githubService.calculateUserMetrics(
        candidate_username
      );

      // Save to database
      metrics = await GitHubMetrics.findOneAndUpdate(
        { username: candidate_username },
        calculatedMetrics,
        { new: true, upsert: true }
      );
    }

    // Compare metrics to standard profile
    const result = compareToStandard(metrics, standardProfile);

    // Create comparison record
    const comparison = await Comparison.create({
      candidate_username,
      standard_profile: standard_profile_id,
      result,
    });

    res.status(201).json(comparison);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all comparisons
exports.getComparisons = async (req, res) => {
  try {
    const comparisons = await Comparison.find()
      .populate("standard_profile", "name description")
      .sort({ created_at: -1 });

    res.json(comparisons);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single comparison
exports.getComparison = async (req, res) => {
  try {
    const comparison = await Comparison.findById(req.params.id).populate(
      "standard_profile"
    );

    if (!comparison) {
      return res
        .status(404)
        .json({ success: false, error: "Comparison not found" });
    }

    res.json(comparison);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete comparison
exports.deleteComparison = async (req, res) => {
  try {
    const comparison = await Comparison.findByIdAndDelete(req.params.id);

    if (!comparison) {
      return res
        .status(404)
        .json({ success: false, error: "Comparison not found" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
