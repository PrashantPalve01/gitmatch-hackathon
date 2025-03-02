import axios from "axios";
import { getAuth } from "firebase/auth";

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get current user from Firebase
export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};

// Initialize default standard profiles for new users
export const initializeStandardProfiles = async (userId) => {
  try {
    // First check if user already has profiles
    const existingProfiles = await getStandardProfiles();
    if (existingProfiles && existingProfiles.length > 0) {
      return existingProfiles; // User already has profiles
    }
  } catch (error) {
    console.error("Error initializing standard profiles:", error);
    throw error;
  }
};

// Helper to get user ID from Firebase
const getUserIdFromFirebase = () => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user.uid;
};

// Add authorization token to requests
api.interceptors.request.use(
  async (config) => {
    const user = getCurrentUser();
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// GitHub API endpoints
export const getGitHubProfile = async (username) => {
  try {
    const response = await api.get(`/github/profile/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching standard profiles:", error);
    throw error;
  }
};

export const getGitHubMetrics = async (username) => {
  const response = await api.get(`/github/metrics/${username}`);
  return response.data;
};

// Standard Profiles endpoints with user filtering
export const getStandardProfiles = async () => {
  try {
    const userId = getUserIdFromFirebase();
    const response = await api.get(`/standards?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching standard profiles:", error);
    throw error;
  }
};

export const getStandardProfile = async (id) => {
  try {
    const response = await api.get(`/standards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStandardProfile = async (profileData) => {
  const userId = getUserIdFromFirebase();

  const dataWithUserId = {
    ...profileData,
    user_id: userId, // Always use the current user's ID
  };

  const response = await api.post("/standards", dataWithUserId);
  return response.data;
};

export const updateStandardProfile = async (id, profileData) => {
  const response = await api.put(`/standards/${id}`, profileData);
  return response.data;
};

export const deleteStandardProfile = async (id) => {
  const response = await api.delete(`/standards/${id}`);
  return response.data;
};

// Comparison endpoints
// Update in api.js
export const createComparison = async (comparisonData) => {
  const userId = getUserIdFromFirebase();

  try {
    const response = await api.post("/comparisons", {
      candidate_username: comparisonData.githubUsername,
      standard_profile_id: comparisonData.standardProfileId,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComparisons = async () => {
  try {
    const userId = getUserIdFromFirebase();
    const response = await api.get(`/comparisons?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comparisons:", error);
    throw error;
  }
};

// In api.js, update the getComparison function (singular, not plural)
export const getComparison = async (id) => {
  try {
    const response = await api.get(`/comparisons/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comparison:", error);
    throw error;
  }
};

export const deleteComparison = async (id) => {
  const response = await api.delete(`/comparisons/${id}`);
  return response.data;
};

export default api;
