import StandardProfile from "../models/StandardProfile.model.js";

// Get all standard profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await StandardProfile.find({
      user_id: req.query.user_id,
    }).sort({ created_at: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single profile
export const getProfile = async (req, res) => {
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
export const createProfile = async (req, res) => {
  try {
    const profile = await StandardProfile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    console.error("Profile creation error:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
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
export const deleteProfile = async (req, res) => {
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
