import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// At the top of your github service file
if (!process.env.GITHUB_TOKEN) {
  console.error(
    "Warning: GITHUB_TOKEN not found in environment. GitHub API requests will be rate-limited."
  );
}

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

// Add token if available
if (process.env.GITHUB_TOKEN) {
  githubApi.defaults.headers.common[
    "Authorization"
  ] = `token ${process.env.GITHUB_TOKEN}`;
}

export const calculateUserMetrics = async (username) => {
  try {
    // Fetch user data
    const userResponse = await githubApi.get(`/users/${username}`);
    const user = userResponse.data;

    // Fetch repositories
    const reposResponse = await githubApi.get(`/users/${username}/repos`, {
      params: { per_page: 100 },
    });
    const repos = reposResponse.data;

    // Calculate language breakdown
    const languageBreakdown = {};

    // For each non-fork repo, get its language breakdown
    for (const repo of repos.filter((r) => !r.fork)) {
      if (repo.language) {
        languageBreakdown[repo.language] =
          (languageBreakdown[repo.language] || 0) + 1;
      }
    }

    // Calculate metrics
    const metrics = {
      username,
      commit_frequency: 5.0, // Simplified value for now
      repository_count: repos.length,
      stars_received: repos.reduce(
        (total, repo) => total + repo.stargazers_count,
        0
      ),
      fork_count: repos.reduce((total, repo) => total + repo.forks_count, 0),
      language_breakdown: languageBreakdown,
      code_quality_estimate: 75.0, // Simplified value for now
      updated_at: new Date(),
    };

    return metrics;
  } catch (error) {
    console.error("Error calculating GitHub metrics:", error);
    throw error;
  }
};

function calculateLanguageBreakdown(repos) {
  const breakdown = {};

  repos.forEach((repo) => {
    const language = repo.language;
    if (language) {
      breakdown[language] = (breakdown[language] || 0) + 1;
    }
  });

  return breakdown;
}

// Basic error handling for API calls
const handleError = (error) => {
  let errorMessage = "Unknown error occurred";

  if (error.response) {
    if (error.response.status === 404) {
      errorMessage = "GitHub user not found";
    } else if (error.response.status === 403) {
      errorMessage =
        "API rate limit exceeded. Try again later or use an API token.";
    } else {
      errorMessage = `GitHub API error: ${
        error.response.data.message || "Unknown error"
      }`;
    }
  } else if (error.request) {
    errorMessage =
      "No response received from GitHub. Check your network connection.";
  } else {
    errorMessage = `Error setting up request: ${error.message}`;
  }

  return { error: true, message: errorMessage };
};

// Fetch basic user profile data
export const getUserProfile = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.log("Something went wrong", error.message);
    throw handleError(error); // Propagate the error
  }
};

// Fetch user repositories
export const getUserRepositories = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`, {
      params: {
        sort: "updated",
        per_page: 100, // Adjust as needed, pagination might be required for users with many repos
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get language breakdown from repositories
export const getLanguageBreakdown = async (repositories) => {
  const languageCounts = {};
  let totalBytes = 0;

  // Only process repos with languages
  const reposWithLanguages = repositories.filter((repo) => !repo.fork);

  // Fetch language data for each repository
  const languagesPromises = reposWithLanguages.map(async (repo) => {
    try {
      const response = await githubApi.get(repo.languages_url);
      return response.data;
    } catch (error) {
      console.warn(`Could not fetch languages for ${repo.name}:`, error);
      return {};
    }
  });

  // Wait for all language requests to complete
  const languagesData = await Promise.all(languagesPromises);

  // Combine language data from all repositories
  languagesData.forEach((repoLanguages) => {
    Object.entries(repoLanguages).forEach(([language, bytes]) => {
      languageCounts[language] = (languageCounts[language] || 0) + bytes;
      totalBytes += bytes;
    });
  });

  // Convert to percentage array
  const languageBreakdown = Object.entries(languageCounts)
    .map(([name, bytes]) => ({
      name,
      value: Math.round((bytes / totalBytes) * 1000) / 10, // Round to 1 decimal place
    }))
    .sort((a, b) => b.value - a.value);

  return languageBreakdown;
};

// Get commit frequency (requires multiple API calls)
export const getCommitFrequency = async (
  username,
  repositories,
  daysToAnalyze = 90
) => {
  // We'll limit to 5 non-fork repos to avoid rate limiting issues
  const reposToAnalyze = repositories
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToAnalyze);

  let totalCommits = 0;

  // Fetch commit data for each repository
  const commitPromises = reposToAnalyze.map(async (repo) => {
    try {
      // Get commits by the user in this repo
      const response = await githubApi.get(`/repos/${repo.full_name}/commits`, {
        params: {
          author: username,
          since: cutoffDate.toISOString(),
          per_page: 100,
        },
      });

      // GitHub might return pagination info if there are more commits
      const commitCount = response.data.length;
      const hasMoreCommits =
        response.headers.link && response.headers.link.includes('rel="next"');

      // For simplicity, we're just counting what we get in the first page
      // In a production app, you'd implement pagination handling
      return hasMoreCommits ? commitCount + "+" : commitCount;
    } catch (error) {
      console.warn(`Could not fetch commits for ${repo.name}:`, error);
      return 0;
    }
  });

  // Wait for all commit requests to complete
  const commitCounts = await Promise.all(commitPromises);

  // Sum up all commits
  totalCommits = commitCounts.reduce(
    (sum, count) => sum + (typeof count === "string" ? parseInt(count) : count),
    0
  );

  // Calculate average commits per day
  const averageCommitsPerDay = totalCommits / daysToAnalyze;

  return {
    totalCommits,
    daysAnalyzed: daysToAnalyze,
    averageCommitsPerDay: Math.round(averageCommitsPerDay * 10) / 10, // Round to 1 decimal place
  };
};

// Function to get comprehensive GitHub profile analytics
export const getGitHubProfileAnalytics = async (username) => {
  try {
    // Get basic profile data
    const profile = await getUserProfile(username);

    // Get repositories
    const repositories = await getUserRepositories(username);

    // Get language breakdown
    const languageBreakdown = await getLanguageBreakdown(repositories);

    // Get commit frequency
    const commitActivity = await getCommitFrequency(username, repositories);

    // Calculate repository statistics
    const repoStats = {
      totalRepos: repositories.length,
      ownedRepos: repositories.filter((repo) => !repo.fork).length,
      forkedRepos: repositories.filter((repo) => repo.fork).length,
      starsReceived: repositories.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0
      ),
      totalWatchers: repositories.reduce(
        (sum, repo) => sum + repo.watchers_count,
        0
      ),
      hasReadmes: repositories.filter((repo) => !repo.fork && repo.description)
        .length,
    };

    // Return combined analytics data
    return {
      profile,
      repoStats,
      languageBreakdown,
      commitActivity,
      topRepositories: repositories
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          language: repo.language,
          updated_at: repo.updated_at,
        })),
    };
  } catch (error) {
    console.error("Error in getGitHubProfileAnalytics:", error);
    throw error;
  }
};

export default {
  getUserProfile,
  getUserRepositories,
  getLanguageBreakdown,
  getCommitFrequency,
  getGitHubProfileAnalytics,
};
