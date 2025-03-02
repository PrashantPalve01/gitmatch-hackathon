// src/utils/metrics.js

// Calculate overall score based on various metrics
export const calculateOverallScore = (metrics, weights = {}) => {
  // Default weights if not provided
  const defaultWeights = {
    commit_frequency: 0.2,
    code_quality: 0.2,
    language_proficiency: 0.25,
    project_diversity: 0.15,
    community_engagement: 0.2,
  };

  const finalWeights = { ...defaultWeights, ...weights };

  // Calculate weighted sum
  let weightedSum = 0;
  let totalWeight = 0;

  Object.entries(metrics).forEach(([key, value]) => {
    if (finalWeights[key]) {
      weightedSum += value * finalWeights[key];
      totalWeight += finalWeights[key];
    }
  });

  // Normalize to ensure we get a score out of 100
  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
};

// Determine hire recommendation based on score and threshold
export const determineRecommendation = (score, threshold = 70) => {
  return score >= threshold ? "Hire" : "No Hire";
};

// Identify strengths based on metrics and thresholds
export const identifyStrengths = (metrics, profile) => {
  const strengths = [];

  // Check commit frequency
  if (metrics.commit_frequency > 80) {
    strengths.push("Consistent and active commit history");
  }

  // Check language proficiency against required languages
  if (metrics.language_proficiency > 85) {
    strengths.push("Strong proficiency in required programming languages");
  }

  // Check code quality
  if (metrics.code_quality > 80) {
    strengths.push("High code quality in repositories");
  }

  // Check project diversity
  if (metrics.project_diversity > 75) {
    strengths.push("Diverse project experience");
  }

  // Check community engagement
  if (metrics.community_engagement > 80) {
    strengths.push("Active participation in the developer community");
  }

  // Add custom strengths based on standard profile if available
  if (profile && profile.metrics) {
    // Add custom logic based on standard profile requirements
  }

  return strengths;
};

// Identify weaknesses based on metrics and thresholds
export const identifyWeaknesses = (metrics, profile) => {
  const weaknesses = [];

  // Check commit frequency
  if (metrics.commit_frequency < 60) {
    weaknesses.push("Inconsistent commit history");
  }

  // Check language proficiency
  if (metrics.language_proficiency < 70) {
    weaknesses.push("Could improve proficiency in required languages");
  }

  // Check code quality
  if (metrics.code_quality < 65) {
    weaknesses.push("Code quality could be improved");
  }

  // Check project diversity
  if (metrics.project_diversity < 60) {
    weaknesses.push("Limited variety in project experience");
  }

  // Check community engagement
  if (metrics.community_engagement < 50) {
    weaknesses.push("Limited community engagement");
  }

  // Add custom weaknesses based on standard profile if available
  if (profile && profile.metrics) {
    // Add custom logic based on standard profile requirements
  }

  return weaknesses;
};

// Map GitHub analytics to standard metrics format
export const mapGitHubAnalyticsToMetrics = (analytics, standardProfile) => {
  // Extract the raw data we need
  const {
    profile,
    repoStats,
    languageBreakdown,
    commitActivity,
    topRepositories,
  } = analytics;

  // Calculate commit frequency score (0-100)
  const commitFrequencyScore = Math.min(
    Math.round(commitActivity.averageCommitsPerDay * 20),
    100
  );

  // Calculate language proficiency score
  // This would ideally compare against required languages in the standard profile
  let languageProficiencyScore = 70; // Default value

  if (
    standardProfile &&
    standardProfile.metrics &&
    standardProfile.metrics.language_requirements
  ) {
    // Check if candidate knows required languages
    const requiredLanguages = standardProfile.metrics.language_requirements;
    const candidateLanguages = languageBreakdown.map((lang) => lang.name);

    const matchCount = requiredLanguages.filter((lang) =>
      candidateLanguages.includes(lang)
    ).length;

    languageProficiencyScore = Math.round(
      (matchCount / requiredLanguages.length) * 100
    );
  }

  // Calculate code quality estimate (this is a simplified approach)
  // In a real app, you might use more sophisticated metrics
  const codeQualityScore = Math.min(
    Math.round(
      (repoStats.hasReadmes / repoStats.ownedRepos) * 50 +
        (repoStats.starsReceived > 0 ? 50 : 30)
    ),
    100
  );

  // Calculate project diversity score
  const projectDiversityScore = Math.min(
    Math.round(
      (repoStats.ownedRepos > 10 ? 50 : repoStats.ownedRepos * 5) +
        (languageBreakdown.length > 3 ? 50 : languageBreakdown.length * 15)
    ),
    100
  );

  // Calculate community engagement score
  const communityEngagementScore = Math.min(
    Math.round(
      (profile.followers > 100 ? 40 : profile.followers * 0.4) +
        (repoStats.forkedRepos > 5 ? 30 : repoStats.forkedRepos * 6) +
        (repoStats.starsReceived > 100 ? 30 : repoStats.starsReceived * 0.3)
    ),
    100
  );

  // Construct the metrics object
  const metrics = {
    commit_frequency: commitFrequencyScore,
    language_proficiency: languageProficiencyScore,
    code_quality: codeQualityScore,
    project_diversity: projectDiversityScore,
    community_engagement: communityEngagementScore,
  };

  // Calculate overall score
  const overallScore = calculateOverallScore(metrics, standardProfile?.weights);

  // Determine recommendation
  const threshold = standardProfile?.threshold || 70;
  const recommendation = determineRecommendation(overallScore, threshold);

  // Identify strengths and weaknesses
  const strengths = identifyStrengths(metrics, standardProfile);
  const weaknesses = identifyWeaknesses(metrics, standardProfile);

  // Return the complete metrics package
  return {
    metrics,
    overall_score: overallScore,
    recommendation,
    strengths,
    weaknesses,
    language_breakdown: languageBreakdown,
  };
};

export default {
  calculateOverallScore,
  determineRecommendation,
  identifyStrengths,
  identifyWeaknesses,
  mapGitHubAnalyticsToMetrics,
};
