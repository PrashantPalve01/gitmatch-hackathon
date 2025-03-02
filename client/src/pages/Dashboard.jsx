import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AddIcon, CheckIcon, CloseIcon, TimeIcon } from "@chakra-ui/icons";
import { FaGithub, FaUserAlt, FaCode } from "react-icons/fa";

// Mock data for initial development
const mockRecentComparisons = [
  {
    id: "1",
    candidateName: "John Doe",
    githubUsername: "johndoe123",
    date: "2023-01-15",
    result: "hire",
    score: 85,
    mainLanguage: "JavaScript",
  },
  {
    id: "2",
    candidateName: "Jane Smith",
    githubUsername: "janesmith456",
    date: "2023-01-14",
    result: "no-hire",
    score: 42,
    mainLanguage: "Python",
  },
  {
    id: "3",
    candidateName: "Bob Johnson",
    githubUsername: "bjohnson789",
    date: "2023-01-13",
    result: "hire",
    score: 78,
    mainLanguage: "Java",
  },
];

const Dashboard = () => {
  const [recentComparisons] = useState(mockRecentComparisons);

  const cardBg = useColorModeValue("white", "gray.700");
  const statCardBg = useColorModeValue("brand.50", "gray.800");

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
          <StatNumber fontSize="3xl">24</StatNumber>
          <StatHelpText>Since January 2023</StatHelpText>
        </Stat>

        <Stat bg={statCardBg} p="5" borderRadius="lg" boxShadow="md">
          <StatLabel fontSize="lg" display="flex" alignItems="center">
            <Icon as={CheckIcon} mr="2" /> Hire Recommendations
          </StatLabel>
          <StatNumber fontSize="3xl">16</StatNumber>
          <StatHelpText>
            <Badge colorScheme="green">67% of total</Badge>
          </StatHelpText>
        </Stat>

        <Stat bg={statCardBg} p="5" borderRadius="lg" boxShadow="md">
          <StatLabel fontSize="lg" display="flex" alignItems="center">
            <Icon as={FaCode} mr="2" /> Top Language
          </StatLabel>
          <StatNumber fontSize="3xl">JavaScript</StatNumber>
          <StatHelpText>Among recommended hires</StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Recent Comparisons */}
      <Box mb="10">
        <Heading size="lg" mb="4">
          Recent Comparisons
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
          {recentComparisons.map((comparison) => (
            <Card key={comparison.id} bg={cardBg} boxShadow="md">
              <CardHeader pb="2">
                <Flex justify="space-between" align="center">
                  <Heading size="md">{comparison.candidateName}</Heading>
                  <Badge
                    colorScheme={comparison.result === "hire" ? "green" : "red"}
                    fontSize="sm"
                    px="2"
                    py="1"
                    borderRadius="md"
                  >
                    {comparison.result === "hire" ? "HIRE" : "NO HIRE"}
                  </Badge>
                </Flex>
                <Text
                  color="gray.500"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaGithub} mr="1" /> {comparison.githubUsername}
                </Text>
              </CardHeader>
              <CardBody py="2">
                <Stack spacing="2">
                  <Flex justify="space-between">
                    <Text fontWeight="medium">Score</Text>
                    <Text>{comparison.score}/100</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="medium">Main Language</Text>
                    <Text>{comparison.mainLanguage}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontWeight="medium">Date</Text>
                    <Text display="flex" alignItems="center">
                      <Icon as={TimeIcon} mr="1" fontSize="xs" />
                      {comparison.date}
                    </Text>
                  </Flex>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter pt="3">
                <Button
                  as={RouterLink}
                  to={`/results/${comparison.id}`}
                  colorScheme="brand"
                  variant="outline"
                  size="sm"
                  width="full"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;
