const GitHubMetrics = require("../models/GitHubMetrics.model");
const { getUserProfile } = require("../services/github.service");

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await getUserProfile(username);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMetrics = async (req, res) => {
  try {
    const { username } = req.params;

    // Check if we have recent metrics
    let metrics = await GitHubMetrics.findOne({
      username,
      updated_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Less than 24 hours old
    });

    if (!metrics) {
      // Calculate new metrics
      const calculatedMetrics = await GitHubService.calculateUserMetrics(
        username
      );

      // Save to database
      metrics = await GitHubMetrics.findOneAndUpdate(
        { username },
        calculatedMetrics,
        { new: true, upsert: true }
      );
    }

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
