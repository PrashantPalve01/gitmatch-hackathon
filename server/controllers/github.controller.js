import { getUserProfile } from "../services/github.service.js";

export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await getUserProfile(username);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
