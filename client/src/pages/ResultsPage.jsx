import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Button,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Badge,
  Progress,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  HStack,
  VStack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Center,
  Spinner,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  WarningIcon,
  ArrowBackIcon,
  DownloadIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { FaGithub, FaCode, FaStar, FaCodeBranch } from "react-icons/fa";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import { getComparison } from "../services/api";

const ResultsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const cardBg = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const result = await getComparison(id);
        setData(result);
      } catch (err) {
        console.error("Error fetching comparison:", err);
        setError("Failed to load comparison results");
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, [id]);

  if (loading) {
    return (
      <Center h="100vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text>Loading comparison results...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py="16">
        <Heading size="lg" color="red.500">
          Error
        </Heading>
        <Text mt="4">{error}</Text>
        <Button mt="6" onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </Button>
      </Box>
    );
  }

  // Defensive checks
  if (!data || !data.candidate || !data.result) {
    return (
      <Box textAlign="center" py="16">
        <Heading size="lg" color="red.500">
          Incomplete Data
        </Heading>
        <Text mt="4">The comparison data is incomplete or unavailable.</Text>
        <Button mt="6" onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </Button>
      </Box>
    );
  }

  // Transform metrics for radar chart
  const radarData = data.result.metrics_breakdown
    ? Object.entries(data.result.metrics_breakdown).map(([key, detail]) => ({
        subject: key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        candidate: detail.score || 0,
        average: detail.average || 70,
        fullMark: 100,
      }))
    : [];

  // Safely extract repository and commit metrics
  const repoStars =
    data.result.metrics_breakdown?.stars_received?.description?.split(" ")[0] ||
    "N/A";
  const commitFrequency =
    data.result.metrics_breakdown?.commit_frequency?.description?.split(
      " "
    )[0] || "N/A";

  const getRecommendationStyles = (recommendation) => {
    switch (recommendation) {
      case "Hire":
        return {
          bg: useColorModeValue("green.50", "green.900"),
          color: "green.500",
          badgeColorScheme: "green",
        };
      case "Consider":
        return {
          bg: useColorModeValue("yellow.50", "yellow.900"),
          color: "yellow.600",
          badgeColorScheme: "yellow",
        };
      case "No Hire":
        return {
          bg: useColorModeValue("red.50", "red.900"),
          color: "red.500",
          badgeColorScheme: "red",
        };
      default:
        return {
          bg: useColorModeValue("gray.50", "gray.900"),
          color: "gray.500",
          badgeColorScheme: "gray",
        };
    }
  };
  const recommendationStyles = getRecommendationStyles(
    data.result.recommendation
  );

  const exportResults = () => {
    // Convert data to JSON or CSV
    const exportData = JSON.stringify(data, null, 2);

    // Create a Blob
    const blob = new Blob([exportData], { type: "application/json" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `github_profile_analysis_${data.candidate.username}.json`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Box>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            mb="2"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
          <Heading size="xl">GitHub Profile Analysis</Heading>
          <Text color="gray.500">
            Results for {data.candidate.name} (@{data.candidate.username})
          </Text>
        </Box>
        <Button
          rightIcon={<DownloadIcon />}
          colorScheme="brand"
          variant="outline"
          onClick={exportResults}
        >
          Export Results
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" mb="8">
        {/* Candidate Profile Card */}
        <Card bg={cardBg} boxShadow="md">
          <CardHeader pb="2">
            <Heading size="md">Candidate Profile</Heading>
          </CardHeader>
          <CardBody>
            <Flex>
              <Avatar size="xl" src={data.candidate.avatar_url} mr="4" />
              <Box>
                <Heading size="md">{data.candidate.name}</Heading>
                <Text color="gray.500" display="flex" alignItems="center">
                  <Icon as={FaGithub} mr="1" /> {data.candidate.username}
                </Text>
                <Text mt="2">{data.candidate.bio}</Text>
                <HStack mt="2" spacing="4">
                  <Text fontSize="sm">
                    {data.candidate.public_repos} repositories
                  </Text>
                  <Text fontSize="sm">
                    {data.candidate.followers} followers
                  </Text>
                </HStack>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        {/* Overall Result Card */}
        <Card bg={recommendationStyles.bg} boxShadow="md">
          <CardHeader pb="2">
            <Heading size="md">Overall Recommendation</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing="4" align="stretch">
              <Flex justify="space-between" align="center">
                <Heading size="2xl" color={recommendationStyles.color}>
                  {data.result.recommendation}
                </Heading>
                <Badge
                  fontSize="2xl"
                  py="2"
                  px="4"
                  borderRadius="lg"
                  colorScheme={recommendationStyles.badgeColorScheme}
                >
                  {Math.floor(data.result.overall_score)}/100
                </Badge>
              </Flex>

              <Text>
                Compared to standard profile:{" "}
                <strong>{data.standard_profile?.name || "N/A"}</strong>
              </Text>

              <Divider />

              <Box>
                <Text fontWeight="bold" mb="1">
                  Key Strengths:
                </Text>
                <List spacing={1}>
                  {data.result.strengths?.map((strength, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      {strength}
                    </ListItem>
                  ))}
                </List>
              </Box>

              {data.result.weaknesses && data.result.weaknesses.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb="1">
                    Areas for Improvement:
                  </Text>
                  <List spacing={1}>
                    {data.result.weaknesses.map((weakness, index) => (
                      <ListItem key={index} display="flex" alignItems="center">
                        <ListIcon as={WarningIcon} color="orange.500" />
                        {weakness}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6" mb="8">
        {/* Radar Chart */}
        <Card bg={cardBg} boxShadow="md">
          <CardHeader pb="0">
            <Heading size="md">Performance Metrics</Heading>
          </CardHeader>
          <CardBody>
            <Box height="350px">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="Candidate"
                    dataKey="candidate"
                    stroke="#3182CE"
                    fill="#3182CE"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Average"
                    dataKey="average"
                    stroke="#718096"
                    fill="#718096"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* Language Breakdown & Stats */}
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="6">
          <Card bg={cardBg} boxShadow="md">
            <CardHeader pb="2">
              <Heading size="md" display="flex" alignItems="center">
                <Icon as={FaCode} mr="2" /> Language Breakdown
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing="4" align="stretch">
                {data.result.language_breakdown.map((lang) => (
                  <Box key={lang.name}>
                    <Flex justify="space-between" mb="1">
                      <Text>{lang.name}</Text>
                      <Text>{lang.value}%</Text>
                    </Flex>
                    <Progress
                      value={lang.value}
                      colorScheme={
                        lang.name === "JavaScript"
                          ? "yellow"
                          : lang.name === "TypeScript"
                          ? "blue"
                          : lang.name === "HTML/CSS"
                          ? "orange"
                          : "green"
                      }
                      borderRadius="full"
                    />
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>

          <VStack spacing="4">
            <Stat
              bg={cardBg}
              p="4"
              borderRadius="lg"
              boxShadow="md"
              width="full"
            >
              <StatLabel display="flex" alignItems="center">
                <Icon as={FaStar} mr="2" /> Repository Stars
              </StatLabel>
              <StatNumber>{repoStars}</StatNumber>
              <StatHelpText>Across all repositories</StatHelpText>
            </Stat>

            <Stat
              bg={cardBg}
              p="4"
              borderRadius="lg"
              boxShadow="md"
              width="full"
            >
              <StatLabel display="flex" alignItems="center">
                <Icon as={FaCodeBranch} mr="2" /> Commit Frequency
              </StatLabel>
              <StatNumber>{commitFrequency}</StatNumber>
              <StatHelpText>Average commits per repo</StatHelpText>
            </Stat>
          </VStack>
        </SimpleGrid>
      </SimpleGrid>

      <Flex justifyContent="center">
        <Button
          rightIcon={<ChevronRightIcon />}
          colorScheme="brand"
          size="lg"
          onClick={() => navigate("/new-comparison")}
        >
          Start New Comparison
        </Button>
      </Flex>
    </Box>
  );
};

export default ResultsPage;
