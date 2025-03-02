import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
  Stack,
  Divider,
  Badge,
  useColorModeValue,
  Center,
  VStack,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AddIcon, CheckIcon, TimeIcon } from "@chakra-ui/icons";
import { FaGithub, FaUserAlt, FaCode } from "react-icons/fa";
import { getComparisons } from "../services/api";

const getRecommendationStyles = (recommendation) => {
  switch (recommendation) {
    case "Hire":
      return {
        colorScheme: "green",
        icon: CheckIcon,
      };
    case "Consider":
      return {
        colorScheme: "yellow",
        icon: TimeIcon,
      };
    case "No Hire":
      return {
        colorScheme: "red",
        icon: null,
      };
    default:
      return {
        colorScheme: "gray",
        icon: null,
      };
  }
};

const Dashboard = () => {
  const [recentComparisons, setRecentComparisons] = useState([]);
  const [stats, setStats] = useState({
    totalCandidates: 0,
    recommendationBreakdown: {
      Hire: 0,
      Consider: 0,
      "No Hire": 0,
    },
    topLanguage: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardBg = useColorModeValue("white", "gray.700");
  const statCardBg = useColorModeValue("brand.50", "gray.800");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const comparisonsData = await getComparisons();
        setRecentComparisons(comparisonsData);

        // Calculate comprehensive stats
        const totalCandidates = comparisonsData.length;
        const recommendationBreakdown = {
          Hire: 0,
          Consider: 0,
          "No Hire": 0,
        };

        // Track languages
        const languageCounts = {};

        // Process each comparison
        comparisonsData.forEach((comparison) => {
          const recommendation = comparison.result?.recommendation || "No Hire";
          recommendationBreakdown[recommendation]++;

          // Track top language
          if (comparison.result?.language_breakdown) {
            comparison.result.language_breakdown.forEach((lang) => {
              languageCounts[lang.name] =
                (languageCounts[lang.name] || 0) + lang.value;
            });
          }
        });

        // Find top language
        const topLanguage =
          Object.keys(languageCounts).length > 0
            ? Object.keys(languageCounts).reduce((a, b) =>
                languageCounts[a] > languageCounts[b] ? a : b
              )
            : "N/A";

        setStats({
          totalCandidates,
          recommendationBreakdown,
          topLanguage,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Center h="70vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text>Loading your dashboard...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="70vh">
        <VStack spacing={4}>
          <Text color="red.500">{error}</Text>
          <Button onClick={() => window.location.reload()} colorScheme="brand">
            Try Again
          </Button>
        </VStack>
      </Center>
    );
  }

  if (recentComparisons.length === 0) {
    return (
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb="8">
          <Box>
            <Heading size="xl" mb="2">
              Welcome to GitHub Recruiter
            </Heading>
            <Text color="gray.500">
              Start evaluating candidates by making your first comparison
            </Text>
          </Box>
          <Button
            as={RouterLink}
            to="/new-comparison"
            colorScheme="brand"
            leftIcon={<AddIcon />}
            size="lg"
          >
            Start First Comparison
          </Button>
        </Flex>

        <Center flexDirection="column" py={10}>
          <Image
            src="/images/empty-state.svg"
            alt="No comparisons yet"
            maxW="300px"
            mb={8}
            fallback={
              <Box
                w="300px"
                h="200px"
                bg="gray.100"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.500">Illustration</Text>
              </Box>
            }
          />

          <VStack
            spacing={4}
            maxW="600px"
            bg={statCardBg}
            p={6}
            borderRadius="lg"
            boxShadow="md"
          >
            <Heading size="md">How GitHub Recruiter Works</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
              <Box p={4} bg={cardBg} borderRadius="md">
                <Flex align="center" mb={2}>
                  <Icon as={FaGithub} mr={2} />
                  <Text fontWeight="bold">Step 1</Text>
                </Flex>
                <Text>Enter a GitHub username to evaluate</Text>
              </Box>

              <Box p={4} bg={cardBg} borderRadius="md">
                <Flex align="center" mb={2}>
                  <Icon as={FaUserAlt} mr={2} />
                  <Text fontWeight="bold">Step 2</Text>
                </Flex>
                <Text>Select a standard profile to compare against</Text>
              </Box>

              <Box p={4} bg={cardBg} borderRadius="md">
                <Flex align="center" mb={2}>
                  <Icon as={FaCode} mr={2} />
                  <Text fontWeight="bold">Step 3</Text>
                </Flex>
                <Text>Review detailed metrics analysis</Text>
              </Box>

              <Box p={4} bg={cardBg} borderRadius="md">
                <Flex align="center" mb={2}>
                  <Icon as={CheckIcon} mr={2} />
                  <Text fontWeight="bold">Step 4</Text>
                </Flex>
                <Text>Get hire/no-hire recommendations</Text>
              </Box>
            </SimpleGrid>

            <Button
              as={RouterLink}
              to="/new-comparison"
              colorScheme="brand"
              leftIcon={<AddIcon />}
              size="lg"
              mt={4}
            >
              Start Your First Comparison
            </Button>
          </VStack>
        </Center>
      </Box>
    );
  }

  // Regular dashboard with past comparisons
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Box>
          <Heading size="xl" mb="2">
            Dashboard
          </Heading>
          <Text color="gray.500">
            Overview of your GitHub recruitment activities
          </Text>
        </Box>
        <Button
          as={RouterLink}
          to="/new-comparison"
          colorScheme="brand"
          leftIcon={<AddIcon />}
          size="lg"
        >
          New Comparison
        </Button>
      </Flex>

      {/* Stats Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mb="8">
        <Stat bg={statCardBg} p="5" borderRadius="lg" boxShadow="md">
          <StatLabel fontSize="lg" display="flex" alignItems="center">
            <Icon as={FaUserAlt} mr="2" /> Total Candidates
          </StatLabel>
          <StatNumber fontSize="3xl">{stats.totalCandidates}</StatNumber>
          <StatHelpText>Since you joined</StatHelpText>
        </Stat>

        <Stat bg={statCardBg} p="5" borderRadius="lg" boxShadow="md">
          <StatLabel fontSize="lg" display="flex" alignItems="center">
            <Icon as={CheckIcon} mr="2" /> Recommendation Breakdown
          </StatLabel>
          <StatNumber fontSize="xl">
            <Flex flexDirection="column">
              {Object.entries(stats.recommendationBreakdown).map(
                ([rec, count]) => (
                  <Flex
                    key={rec}
                    justifyContent="space-between"
                    alignItems="center"
                    mb="1"
                  >
                    <Badge
                      colorScheme={getRecommendationStyles(rec).colorScheme}
                      mr="2"
                    >
                      {rec}
                    </Badge>
                    <Text>{count}</Text>
                  </Flex>
                )
              )}
            </Flex>
          </StatNumber>
          <StatHelpText>Candidate Recommendations</StatHelpText>
        </Stat>

        <Stat bg={statCardBg} p="5" borderRadius="lg" boxShadow="md">
          <StatLabel fontSize="lg" display="flex" alignItems="center">
            <Icon as={FaCode} mr="2" /> Top Language
          </StatLabel>
          <StatNumber fontSize="3xl">{stats.topLanguage}</StatNumber>
          <StatHelpText>Among candidates</StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Recent Comparisons */}
      <Box mb="10">
        <Heading size="lg" mb="4">
          Recent Comparisons
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
          {recentComparisons.map((comparison) => {
            const recommendationStyles = getRecommendationStyles(
              comparison.result?.recommendation || "No Hire"
            );

            return (
              <Card key={comparison._id} bg={cardBg} boxShadow="md">
                <CardHeader pb="2">
                  <Flex justify="space-between" align="center">
                    <Heading size="md">
                      {comparison.candidate_username || "Unknown Candidate"}
                    </Heading>
                    <Badge
                      colorScheme={recommendationStyles.colorScheme}
                      fontSize="sm"
                      px="2"
                      py="1"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                    >
                      {recommendationStyles.icon && (
                        <Icon as={recommendationStyles.icon} mr="1" />
                      )}
                      {comparison.result?.recommendation || "No Hire"}
                    </Badge>
                  </Flex>
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={FaGithub} mr="1" />
                    {comparison.candidate_username || "N/A"}
                  </Text>
                </CardHeader>
                <CardBody py="2">
                  <Stack spacing="2">
                    <Flex justify="space-between">
                      <Text fontWeight="medium">Score</Text>
                      <Text>
                        {Math.floor(comparison.result?.overall_score || 0)}/100
                      </Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text fontWeight="medium">Main Language</Text>
                      <Text>
                        {comparison.result?.language_breakdown?.[0]?.name ||
                          "N/A"}
                      </Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text fontWeight="medium">Date</Text>
                      <Text display="flex" alignItems="center">
                        <Icon as={TimeIcon} mr="1" fontSize="xs" />
                        {new Date(comparison.created_at).toLocaleDateString()}
                      </Text>
                    </Flex>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter pt="3">
                  <Button
                    as={RouterLink}
                    to={`/results/${comparison._id}`}
                    colorScheme="brand"
                    variant="outline"
                    size="sm"
                    width="full"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;
