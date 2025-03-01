import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  Divider,
  Icon,
  Flex,
  useColorModeValue,
  SimpleGrid,
  Badge,
  Container,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  CardHeader,
  CardFooter,
  Stack,
} from "@chakra-ui/react";
import { CheckIcon, TimeIcon } from "@chakra-ui/icons";
import { FaGithub, FaCode, FaUserAlt } from "react-icons/fa";

const Dashboard = () => {
  const [evaluatedCandidates, setEvaluatedCandidates] = useState([]);
  const [stats, setStats] = useState({
    totalCandidates: 0,
    hireRecommendations: 0,
    noHireRecommendations: 0,
    topLanguage: "N/A"
  });

  const cardBg = useColorModeValue("white", "gray.700");
  const statCardBg = useColorModeValue("brand.50", "gray.800");

  // Load evaluated candidates from localStorage on component mount
  useEffect(() => {
    const savedCandidates = localStorage.getItem("evaluatedCandidates");
    if (savedCandidates) {
      const parsedCandidates = JSON.parse(savedCandidates);
      setEvaluatedCandidates(parsedCandidates);
    }
  }, []);

  // Update stats when evaluatedCandidates changes
  useEffect(() => {
    if (evaluatedCandidates.length > 0) {
      // Count hire and no-hire recommendations
      const totalHired = evaluatedCandidates.filter(candidate => candidate.decision === "hire").length;
      const totalNoHired = evaluatedCandidates.filter(candidate => candidate.decision === "no-hire").length;
      
      // Find the most common language among all evaluated candidates
      const languageCounts = {};
      evaluatedCandidates.forEach(candidate => {
        if (candidate.skills && candidate.skills.length > 0) {
          candidate.skills.forEach(skill => {
            languageCounts[skill] = (languageCounts[skill] || 0) + 1;
          });
        }
      });
      
      let topLang = "N/A";
      let maxCount = 0;
      for (const [lang, count] of Object.entries(languageCounts)) {
        if (count > maxCount) {
          maxCount = count;
          topLang = lang;
        }
      }
      
      setStats({
        totalCandidates: evaluatedCandidates.length,
        hireRecommendations: totalHired,
        noHireRecommendations: totalNoHired,
        topLanguage: topLang
      });
    }
  }, [evaluatedCandidates]);

  // Clear all candidate data
  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all candidate data? This action cannot be undone.")) {
      localStorage.removeItem("evaluatedCandidates");
      localStorage.removeItem("hireStatus");
      setEvaluatedCandidates([]);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justifyContent="space-between" alignItems="center" mb="6">
        <Heading size="xl">Dashboard</Heading>
        {evaluatedCandidates.length > 0 && (
          <Button colorScheme="red" variant="outline" onClick={handleClearData}>
            Clear All Data
          </Button>
        )}
      </Flex>

      {evaluatedCandidates.length === 0 ? (
        <Card bg={cardBg} boxShadow="md" p="6">
          <CardBody textAlign="center">
            <Heading size="md" mb="4">No Candidates Evaluated Yet</Heading>
            <Text color="gray.500">
              Start searching for GitHub users with specific skills to see your dashboard analytics here.
            </Text>
          </CardBody>
        </Card>
      ) : (
        <Box>
          {/* Stats Section */}
          <Heading size="lg" mb="6">Dashboard Overview</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing="6" mb="8">
            <Stat bg={statCardBg} p="5" borderRadius="lg" boxShadow="md">
              <StatLabel fontSize="lg" display="flex" alignItems="center">
                <Icon as={FaUserAlt} mr="2" /> Total Evaluated
              </StatLabel>
              <StatNumber fontSize="3xl">{stats.totalCandidates}</StatNumber>
              <StatHelpText>Based on your searches</StatHelpText>
            </Stat>

            <Stat bg={statCardBg} p="5" borderRadius="lg" boxShadow="md">
              <StatLabel fontSize="lg" display="flex" alignItems="center">
                <Icon as={CheckIcon} mr="2" /> Hire Recommendations
              </StatLabel>
              <StatNumber fontSize="3xl">{stats.hireRecommendations}</StatNumber>
              <StatHelpText>
                <Badge colorScheme="green">
                  {stats.totalCandidates > 0 
                    ? `${Math.round((stats.hireRecommendations / stats.totalCandidates) * 100)}% of total` 
                    : "0% of total"}
                </Badge>
              </StatHelpText>
            </Stat>
            
            <Stat bg={statCardBg} p="5" borderRadius="lg" boxShadow="md">
              <StatLabel fontSize="lg" display="flex" alignItems="center">
                <Icon as={CheckIcon} mr="2" /> No-Hire Decisions
              </StatLabel>
              <StatNumber fontSize="3xl">{stats.noHireRecommendations}</StatNumber>
              <StatHelpText>
                <Badge colorScheme="red">
                  {stats.totalCandidates > 0 
                    ? `${Math.round((stats.noHireRecommendations / stats.totalCandidates) * 100)}% of total` 
                    : "0% of total"}
                </Badge>
              </StatHelpText>
            </Stat>

            <Stat bg={statCardBg} p="5" borderRadius="lg" boxShadow="md">
              <StatLabel fontSize="lg" display="flex" alignItems="center">
                <Icon as={FaCode} mr="2" /> Top Language
              </StatLabel>
              <StatNumber fontSize="3xl">{stats.topLanguage}</StatNumber>
              <StatHelpText>Among all candidates</StatHelpText>
            </Stat>
          </SimpleGrid>

          {/* Recent Comparisons - Show all evaluated candidates */}
          <Box mb="10">
            <Heading size="lg" mb="4">
              Recent Comparisons
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
              {evaluatedCandidates
                .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
                .map((candidate) => (
                <Card key={candidate.id} bg={cardBg} boxShadow="md">
                  <CardHeader pb="2">
                    <Flex justify="space-between" align="center">
                      <Heading size="md">{candidate.name || candidate.login}</Heading>
                      <Badge
                        colorScheme={candidate.decision === "hire" ? "green" : "red"}
                        fontSize="sm"
                        px="2"
                        py="1"
                        borderRadius="md"
                      >
                        {candidate.decision === "hire" ? "HIRE" : "NO HIRE"}
                      </Badge>
                    </Flex>
                    <Text
                      color="gray.500"
                      fontSize="sm"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={FaGithub} mr="1" /> {candidate.login}
                    </Text>
                  </CardHeader>
                  <CardBody py="2">
                    <Stack spacing="2">
                      <Flex justify="space-between">
                        <Text fontWeight="medium">Score</Text>
                        <Text>{candidate.score}/100</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text fontWeight="medium">Skills</Text>
                        <Flex wrap="wrap" gap="1" justifyContent="flex-end">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} colorScheme="brand" fontSize="xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge fontSize="xs">+{candidate.skills.length - 3}</Badge>
                          )}
                        </Flex>
                      </Flex>
                      <Flex justify="space-between">
                        <Text fontWeight="medium">Date</Text>
                        <Text display="flex" alignItems="center">
                          <Icon as={TimeIcon} mr="1" fontSize="xs" />
                          {new Date(candidate.dateAdded).toLocaleDateString()}
                        </Text>
                      </Flex>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter pt="3">
                    <Button
                      as="a"
                      href={candidate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      colorScheme="brand"
                      variant="outline"
                      size="sm"
                      width="full"
                    >
                      View GitHub Profile
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;