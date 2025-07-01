import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaCode,
  FaUsers,
  FaSearch,
  FaDatabase,
  FaUserPlus,
  FaRobot,
  FaUserCheck,
  FaBalanceScale,
  FaChartLine,
  FaBrain,
} from "react-icons/fa";
import Footer from "../components/Footer";

const FeatureCard = ({ icon, title, description, isComingSoon }) => {
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
      opacity={isComingSoon ? 0.8 : 1}
    >
      {isComingSoon && (
        <Box
          position="absolute"
          top={2}
          right={2}
          bg="orange.500"
          color="white"
          px={2}
          py={1}
          rounded="md"
          fontSize="xs"
          fontWeight="bold"
        >
          Coming Soon
        </Box>
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
            What We Built
          </Heading>
          <Text fontSize="xl" maxW="container.md">
            A functional GitHub-based recruitment platform developed during a
            48-hour hackathon, showcasing core features for connecting
            developers with recruiters.
          </Text>
        </Container>
      </Box>

      {/* Core Features Grid */}
      <Container maxW="container.xl" py={16}>
        <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
          Key Features Implemented
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <FeatureCard
            icon={FaGithub}
            title="GitHub Profile Integration"
            description="Connect and fetch GitHub profile data including repositories, contribution activity, and basic developer statistics."
          />

          <FeatureCard
            icon={FaUsers}
            title="Developer-Recruiter Matching"
            description="Match developers with recruiters based on GitHub profile data, programming languages, and project types."
          />

          <FeatureCard
            icon={FaCode}
            title="Programming Language Analysis"
            description="Deep analysis of actual code bytes per language from GitHub repositories, providing accurate skill assessment and language proficiency percentages."
          />

          <FeatureCard
            icon={FaDatabase}
            title="Standard Profile Creation"
            description="Recruiters can create custom standard profiles with required skills and experience levels for different positions."
          />

          <FeatureCard
            icon={FaUserCheck}
            title="Advanced Profile Comparison"
            description="Compare developer GitHub profiles against custom standard profiles using weighted metrics including commit frequency, language proficiency, and repository quality."
          />

          <FeatureCard
            icon={FaRobot}
            title="Algorithmic Hiring Recommendations"
            description="Get data-driven hiring recommendations using weighted scoring algorithms that analyze GitHub metrics, commit patterns, and language proficiency matches."
          />

          <FeatureCard
            icon={FaBalanceScale}
            title="Candidate Comparison"
            description="Compare multiple candidates side-by-side with detailed analysis of their GitHub profiles, skills, and project contributions."
            isComingSoon={true}
          />

          <FeatureCard
            icon={FaBrain}
            title="AI-Powered Profile Analysis"
            description="Get comprehensive candidate analysis with AI-generated insights into coding patterns, project complexity, collaboration skills, and detailed technical assessments."
            isComingSoon={true}
          />

          <FeatureCard
            icon={FaChartLine}
            title="Advanced Analytics Dashboard"
            description="Deep insights into candidate profiles with algorithmic analysis of commit patterns, repository statistics, and detailed scoring breakdowns with strengths and weaknesses."
            isComingSoon={true}
          />
        </SimpleGrid>
      </Container>

      {/* Technical Implementation Details */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="container.xl">
          <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
            Technical Implementation
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            <VStack align="start" spacing={6}>
              <Box>
                <Heading size="lg" mb={4} color={headingColor}>
                  Frontend Features
                </Heading>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Icon as={FaCode} color="brand.500" />
                    <Text>React.js with Chakra UI components</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCode} color="brand.500" />
                    <Text>Responsive design for mobile and desktop</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCode} color="brand.500" />
                    <Text>User authentication and role management</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCode} color="brand.500" />
                    <Text>GitHub profile data visualization</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCode} color="brand.500" />
                    <Text>Advanced search filters and candidate ranking</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCode} color="brand.500" />
                    <Text>Interactive candidate comparison dashboard</Text>
                  </HStack>
                </VStack>
              </Box>
            </VStack>

            <VStack align="start" spacing={6}>
              <Box>
                <Heading size="lg" mb={4} color={headingColor}>
                  Backend Features
                </Heading>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Icon as={FaDatabase} color="brand.500" />
                    <Text>Node.js and Express.js REST APIs</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaDatabase} color="brand.500" />
                    <Text>MongoDB database for user and profile data</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaDatabase} color="brand.500" />
                    <Text>GitHub API integration for profile fetching</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaDatabase} color="brand.500" />
                    <Text>Weighted scoring algorithm for recommendations</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaDatabase} color="brand.500" />
                    <Text>Future AI integration for enhanced analysis</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaDatabase} color="brand.500" />
                    <Text>Rule-based recommendation engine</Text>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* What Makes It Special */}
      <Container maxW="container.xl" py={16}>
        <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
          Hackathon Achievement
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <VStack spacing={4} textAlign="center">
            <Icon as={FaGithub} boxSize={12} color="brand.500" />
            <Heading size="md">Real GitHub Data</Heading>
            <Text color={useColorModeValue("gray.600", "gray.300")}>
              Successfully integrated with GitHub's API to fetch and display
              real developer profile information and repository data.
            </Text>
          </VStack>

          <VStack spacing={4} textAlign="center">
            <Icon as={FaUsers} boxSize={12} color="brand.500" />
            <Heading size="md">Data-Driven Matching</Heading>
            <Text color={useColorModeValue("gray.600", "gray.300")}>
              Implemented a sophisticated algorithmic matching system with
              weighted scoring that analyzes real GitHub data to connect
              developers and recruiters.
            </Text>
          </VStack>

          <VStack spacing={4} textAlign="center">
            <Icon as={FaCode} boxSize={12} color="brand.500" />
            <Heading size="md">Full Stack Solution</Heading>
            <Text color={useColorModeValue("gray.600", "gray.300")}>
              Built a complete MERN stack application with user authentication,
              database integration, and responsive UI in just 48 hours.
            </Text>
          </VStack>
        </SimpleGrid>
      </Container>

      <Footer />
    </Box>
  );
};

export default Features;
