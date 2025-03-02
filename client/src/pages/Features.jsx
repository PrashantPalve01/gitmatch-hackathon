import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Flex,
  VStack,
  HStack,
  Badge,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaCode,
  FaChartLine,
  FaUserCheck,
  FaDatabase,
  FaRobot,
  FaSearch,
  FaRegLightbulb,
} from "react-icons/fa";
import Footer from "../components/Footer";

const FeatureCard = ({ icon, title, description, isNew }) => {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      boxShadow="md"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      position="relative"
    >
      {isNew && (
        <Badge position="absolute" top={2} right={2} colorScheme="green">
          New
        </Badge>
      )}
      <Icon as={icon} w={10} h={10} color="brand.500" mb={4} />
      <Heading size="md" mb={3}>
        {title}
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        {description}
      </Text>
    </Box>
  );
};

const Features = () => {
  const headingColor = useColorModeValue("gray.700", "white");
  const sectionBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="brand.500" color="white" py={16}>
        <Container maxW="container.xl">
          <Heading size="2xl" mb={4}>
            Powerful Features
          </Heading>
          <Text fontSize="xl" maxW="container.md">
            GitHub Recruiter brings you a comprehensive toolset to evaluate
            technical candidates through their GitHub profiles, helping you make
            data-driven hiring decisions.
          </Text>
        </Container>
      </Box>

      {/* Core Features Grid */}
      <Container maxW="container.xl" py={16}>
        <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
          Core Capabilities
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <FeatureCard
            icon={FaGithub}
            title="GitHub Profile Analysis"
            description="Connect directly to GitHub's API to pull comprehensive profile data, repositories, commit history, and collaboration patterns."
          />

          <FeatureCard
            icon={FaChartLine}
            title="Metric Visualization"
            description="View interactive charts and graphs that visualize key metrics such as commit frequency, code quality, and language diversity."
            isNew={true}
          />

          <FeatureCard
            icon={FaUserCheck}
            title="Candidate Comparison"
            description="Compare candidates against each other or against predefined standard profiles to identify the best match for your team."
          />

          <FeatureCard
            icon={FaCode}
            title="Language Proficiency Scoring"
            description="Automatically analyze language breakdown and expertise levels based on real coding activity and repository contributions."
          />

          <FeatureCard
            icon={FaDatabase}
            title="Standard Profiles"
            description="Create custom standard profiles based on role requirements or use our templates for common engineering positions."
          />

          <FeatureCard
            icon={FaRobot}
            title="AI-Powered Recommendations"
            description="Receive hire/no-hire recommendations backed by data and our intelligent scoring algorithm."
            isNew={true}
          />
        </SimpleGrid>
      </Container>

      {/* Detailed Features Section */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12} align="start">
            <Box>
              <Heading size="lg" mb={6} color={headingColor}>
                Comprehensive GitHub Data Analysis
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <VStack align="start" spacing={4}>
                  <HStack>
                    <Icon as={FaSearch} color="brand.500" />
                    <Text fontWeight="bold">Repository Analysis</Text>
                  </HStack>
                  <Text>
                    Examine the quality and quantity of repositories, stars
                    received, and fork counts to assess a candidate's impact.
                  </Text>

                  <HStack>
                    <Icon as={FaSearch} color="brand.500" />
                    <Text fontWeight="bold">Commit Patterns</Text>
                  </HStack>
                  <Text>
                    Analyze commit frequency, consistency, and average commit
                    size to understand working habits and code quality.
                  </Text>
                </VStack>

                <VStack align="start" spacing={4}>
                  <HStack>
                    <Icon as={FaSearch} color="brand.500" />
                    <Text fontWeight="bold">Language Breakdown</Text>
                  </HStack>
                  <Text>
                    Get detailed analysis of programming languages used, with
                    expertise levels estimated based on code volume and
                    complexity.
                  </Text>

                  <HStack>
                    <Icon as={FaSearch} color="brand.500" />
                    <Text fontWeight="bold">Code Quality Estimate</Text>
                  </HStack>
                  <Text>
                    Our algorithm examines commit messages, code structure, and
                    contribution patterns to estimate overall code quality.
                  </Text>
                </VStack>
              </SimpleGrid>
            </Box>

            <Divider />

            <Box>
              <Heading size="lg" mb={6} color={headingColor}>
                Powerful Comparison Tools
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <VStack align="start" spacing={4}>
                  <HStack>
                    <Icon as={FaRegLightbulb} color="brand.500" />
                    <Text fontWeight="bold">Standard Profile Templates</Text>
                  </HStack>
                  <Text>
                    Use our predefined templates for various developer roles or
                    create custom standards tailored to your specific
                    requirements.
                  </Text>

                  <HStack>
                    <Icon as={FaRegLightbulb} color="brand.500" />
                    <Text fontWeight="bold">Weighted Scoring System</Text>
                  </HStack>
                  <Text>
                    Configure which metrics matter most to your team with
                    adjustable weights for different skills and activities.
                  </Text>
                </VStack>

                <VStack align="start" spacing={4}>
                  <HStack>
                    <Icon as={FaRegLightbulb} color="brand.500" />
                    <Text fontWeight="bold">Side-by-Side Comparisons</Text>
                  </HStack>
                  <Text>
                    Compare multiple candidates simultaneously to identify
                    strengths and weaknesses across your applicant pool.
                  </Text>

                  <HStack>
                    <Icon as={FaRegLightbulb} color="brand.500" />
                    <Text fontWeight="bold">
                      Strength & Weakness Identification
                    </Text>
                  </HStack>
                  <Text>
                    Automatically identify a candidate's strongest skills and
                    potential areas for improvement based on their GitHub
                    activity.
                  </Text>
                </VStack>
              </SimpleGrid>
            </Box>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Features;
