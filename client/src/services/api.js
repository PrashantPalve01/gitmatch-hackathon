import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Define default standard profiles that should always be available
const DEFAULT_STANDARD_PROFILES = [
  {
    id: "1",
    name: "Junior Frontend Developer",
    description:
      "Entry-level frontend developer with basic JavaScript and React knowledge",
    metrics: {
      commit_frequency: 60,
      code_quality: 70,
      language_proficiency: 60,
      project_diversity: 50,
      community_engagement: 40,
    },
  },
  {
    id: "2",
    name: "Mid-level Full Stack Developer",
    description: "Experienced developer with frontend and backend skills",
    metrics: {
      commit_frequency: 75,
      code_quality: 80,
      language_proficiency: 75,
      project_diversity: 70,
      community_engagement: 65,
    },
  },
  {
    id: "3",
    name: "Senior Backend Developer",
    description:
      "Expert backend developer with system design and architecture experience",
    metrics: {
      commit_frequency: 85,
      code_quality: 90,
      language_proficiency: 85,
      project_diversity: 80,
      community_engagement: 75,
    },
  },
];

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GitHub API endpoints
export const getGitHubProfile = async (username) => {
  const response = await api.get(`/github/profile/${username}`);
  return response.data;
};

export const getGitHubMetrics = async (username) => {
  const response = await api.get(`/github/metrics/${username}`);
  return response.data;
};

// Standard Profiles endpoints with default profile protection
export const getStandardProfiles = async () => {
  try {
    const response = await api.get("/standards");
    const profiles = response.data;

    // Ensure default profiles are included
    const ensuredProfiles = ensureDefaultProfiles(profiles);

    // If we had to add any default profiles, update the backend
    if (ensuredProfiles.length !== profiles.length) {
      // Only update if there's a difference
      for (const profile of ensuredProfiles) {
        if (!profiles.some((p) => p.id === profile.id)) {
          await createStandardProfile(profile);
        }
      }
    }

    return ensuredProfiles;
  } catch (error) {
    console.error("Error fetching standard profiles:", error);
    // Return default profiles as fallback
    return [...DEFAULT_STANDARD_PROFILES];
  }
};

export const getStandardProfile = async (id) => {
  try {
    const response = await api.get(`/standards/${id}`);
    return response.data;
  } catch (error) {
    // If the profile doesn't exist but is one of the defaults, return it
    const defaultProfile = DEFAULT_STANDARD_PROFILES.find((p) => p.id === id);
    if (defaultProfile) {
      // Try to create it in the backend
      try {
        await createStandardProfile(defaultProfile);
      } catch (createError) {
        console.error("Error creating default profile:", createError);
      }
      return defaultProfile;
    }
    throw error;
  }
};

export const createStandardProfile = async (profileData) => {
  const response = await api.post("/standards", profileData);
  return response.data;
};

export const updateStandardProfile = async (id, profileData) => {
  const response = await api.put(`/standards/${id}`, profileData);
  return response.data;
};

export const deleteStandardProfile = async (id) => {
  // Check if the profile is one of the defaults
  if (DEFAULT_STANDARD_PROFILES.some((p) => p.id === id)) {
    throw new Error("Cannot delete default standard profiles");
  }

  const response = await api.delete(`/standards/${id}`);
  return response.data;
};

// Comparison endpoints
export const createComparison = async (comparisonData) => {
  const response = await api.post("/comparisons", {
    candidate_username: comparisonData.githubUsername,
    standard_profile_id: comparisonData.standardProfileId,
  });
  return response.data;
};

export const getComparisons = async () => {
  const response = await api.get("/comparisons");
  return response.data;
};

export const getComparison = async (id) => {
  const response = await api.get(`/comparisons/${id}`);
  return response.data;
};

export const deleteComparison = async (id) => {
  const response = await api.delete(`/comparisons/${id}`);
  return response.data;
};

// Helper function to ensure default profiles exist
function ensureDefaultProfiles(profiles) {
  const result = [...profiles];

  DEFAULT_STANDARD_PROFILES.forEach((defaultProfile) => {
    if (!profiles.some((p) => p.id === defaultProfile.id)) {
      result.push(defaultProfile);
    }
  });

  return result;
}

export { DEFAULT_STANDARD_PROFILES };
export default api;
