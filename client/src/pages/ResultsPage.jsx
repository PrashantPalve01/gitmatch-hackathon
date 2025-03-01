import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

// Mock data for development
const mockComparisonResult = {
  id: "123",
  candidate: {
    username: "johndoe123",
    name: "John Doe",
    avatar_url: "https://via.placeholder.com/150",
    public_repos: 32,
    followers: 156,
    bio: "Senior JavaScript Developer with a passion for React and Node.js",
  },
  standard_profile: {
    id: "2",
    name: "Mid-level Full Stack Developer",
  },
  result: {
    overall_score: 82,
    recommendation: "Hire",
    metrics: {
      commit_frequency: 85,
      code_quality: 78,
      language_proficiency: 90,
      project_diversity: 75,
      community_engagement: 80,
    },
    strengths: [
      "Strong JavaScript and React expertise",
      "Consistent commit history over the past year",
      "Good code quality in public repositories",
      "Active contributor to open source projects",
    ],
    weaknesses: [
      "Limited backend experience compared to frontend",
      "Could improve documentation in repositories",
    ],
    language_breakdown: [
      { name: "JavaScript", value: 65 },
      { name: "TypeScript", value: 20 },
      { name: "HTML/CSS", value: 10 },
      { name: "Python", value: 5 },
    ],
  },
};

const ResultsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardBg = useColorModeValue("white", "gray.700");
  const successBg = useColorModeValue("green.50", "green.900");
  const dangerBg = useColorModeValue("red.50", "red.900");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockComparisonResult);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" py="16">
        <Heading size="lg">Loading results...</Heading>
        <Progress
          size="xs"
          isIndeterminate
          colorScheme="brand"
          maxW="400px"
          mx="auto"
          mt="4"
        />
      </Box>
    );
  }

  // Transform metrics for radar chart
  const radarData = Object.entries(data.result.metrics).map(([key, value]) => ({
    subject: key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    candidate: value,
    average: 70, // Mock average value, would come from backend in real app
    fullMark: 100,
  }));

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Box>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            mb="2"
            onClick={() => window.history.back()}
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
        <Card
          bg={data.result.recommendation === "Hire" ? successBg : dangerBg}
          boxShadow="md"
        >
          <CardHeader pb="2">
            <Heading size="md">Overall Recommendation</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing="4" align="stretch">
              <Flex justify="space-between" align="center">
                <Heading
                  size="2xl"
                  color={
                    data.result.recommendation === "Hire"
                      ? "green.500"
                      : "red.500"
                  }
                >
                  {data.result.recommendation}
                </Heading>
                <Badge
                  fontSize="2xl"
                  py="2"
                  px="4"
                  borderRadius="lg"
                  colorScheme={
                    data.result.recommendation === "Hire" ? "green" : "red"
                  }
                >
                  {data.result.overall_score}/100
                </Badge>
              </Flex>

              <Text>
                Compared to standard profile:{" "}
                <strong>{data.standard_profile.name}</strong>
              </Text>

              <Divider />

              <Box>
                <Text fontWeight="bold" mb="1">
                  Key Strengths:
                </Text>
                <List spacing={1}>
                  {data.result.strengths.map((strength, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      {strength}
                    </ListItem>
                  ))}
                </List>
              </Box>

              {data.result.weaknesses.length > 0 && (
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
              <StatNumber>1,245</StatNumber>
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
              <StatNumber>4.8</StatNumber>
              <StatHelpText>Average commits per day</StatHelpText>
            </Stat>
          </VStack>
        </SimpleGrid>
      </SimpleGrid>

      <Flex justifyContent="center">
        <Button
          rightIcon={<ChevronRightIcon />}
          colorScheme="brand"
          size="lg"
          as="a"
          href="/new-comparison"
        >
          Start New Comparison
        </Button>
      </Flex>
    </Box>
  );
};

export default ResultsPage;
