const StandardProfile = require("../models/StandardProfile.model");

// Get all standard profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await StandardProfile.find().sort({ created_at: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await StandardProfile.findById(req.params.id);

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create profile
exports.createProfile = async (req, res) => {
  try {
    const profile = await StandardProfile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const profile = await StandardProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await StandardProfile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
