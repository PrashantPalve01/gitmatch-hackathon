import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCode, FaUsers, FaRocket, FaGithub } from "react-icons/fa";
import Footer from "../components/Footer";

const ValueCard = ({ icon, title, description }) => {
  return (
    <VStack spacing={4} align="start" p={5}>
      <Icon as={icon} boxSize={10} color="brand.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        {description}
      </Text>
    </VStack>
  );
};

const About = () => {
  const headingColor = useColorModeValue("gray.700", "white");
  const sectionBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="brand.500" color="white" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={4} align="start" maxW="container.md">
            <Heading size="2xl">About GitHub Recruiter</Heading>
            <Text fontSize="xl">
              A hackathon project that connects developers with recruiters based
              on their GitHub profiles and coding activity.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Project Story Section */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Heading size="xl" mb={6} color={headingColor}>
              The Project
            </Heading>
            <VStack spacing={4} align="start">
              <Text>
                GitHub Recruiter was developed during a 48-hour hackathon on
                March 1-2, 2025. The goal was to create a platform that makes it
                easier for recruiters to discover quality developers based on
                their actual GitHub activity and contributions.
              </Text>
              <Text>
                Built with the MERN stack (MongoDB, Express.js, React, Node.js),
                the application analyzes GitHub profiles to match developers
                with recruiters based on coding skills, project quality, and
                development patterns.
              </Text>
              <Text>
                The project demonstrates how GitHub data can be leveraged to
                create meaningful connections between talent and opportunities
                in the tech industry.
              </Text>
            </VStack>
          </Box>
          <Flex justify="center" align="center">
            <Image
              src="/landingInterface.png"
              alt="GitHub Recruiter Interface"
              rounded="lg"
              shadow="lg"
              transform={{ base: "scale(1)", md: "scale(1.05)" }}
              transition="transform 0.3s ease"
              _hover={{
                transform: { base: "scale(1.02)", md: "scale(1.08)" },
              }}
            />
          </Flex>
        </SimpleGrid>
      </Container>

      {/* Core Features */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="container.xl">
          <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
            What We Built
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <ValueCard
              icon={FaGithub}
              title="GitHub Integration"
              description="Seamlessly connects with GitHub API to fetch developer profiles, repositories, and contribution data."
            />
            <ValueCard
              icon={FaUsers}
              title="Smart Matching"
              description="Matches developers with recruiters based on skills, experience level, and project types."
            />
            <ValueCard
              icon={FaCode}
              title="Profile Analysis"
              description="Analyzes coding languages, commit frequency, and repository quality to assess developer skills."
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Hackathon Timeline */}
      <Container maxW="container.xl" py={16}>
        <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
          48-Hour Development Journey
        </Heading>

        <VStack spacing={8} align="stretch" maxW="container.md" mx="auto">
          <HStack spacing={6} align="start">
            <Box minW="120px" textAlign="right">
              <Text fontWeight="bold">March 1, 2025</Text>
              <Text fontSize="sm" color="gray.500">
                Day 1
              </Text>
            </Box>
            <Box position="relative" px={6}>
              <Box
                position="absolute"
                left="0"
                top="0"
                bottom="0"
                width="2px"
                bg="brand.500"
              />
              <Box
                position="absolute"
                left="-4px"
                top="6px"
                width="10px"
                height="10px"
                borderRadius="full"
                bg="brand.500"
              />
              <VStack align="start" spacing={2} pt={1}>
                <Heading size="sm">Project Kickoff</Heading>
                <Text color={useColorModeValue("gray.600", "gray.300")}>
                  Conceptualized the idea, set up the MERN stack foundation, and
                  began GitHub API integration.
                </Text>
              </VStack>
            </Box>
          </HStack>

          <HStack spacing={6} align="start">
            <Box minW="120px" textAlign="right">
              <Text fontWeight="bold">March 2, 2025</Text>
              <Text fontSize="sm" color="gray.500">
                Day 2
              </Text>
            </Box>
            <Box position="relative" px={6}>
              <Box
                position="absolute"
                left="0"
                top="0"
                bottom="0"
                width="2px"
                bg="brand.500"
              />
              <Box
                position="absolute"
                left="-4px"
                top="6px"
                width="10px"
                height="10px"
                borderRadius="full"
                bg="brand.500"
              />
              <VStack align="start" spacing={2} pt={1}>
                <Heading size="sm">Development & Completion</Heading>
                <Text color={useColorModeValue("gray.600", "gray.300")}>
                  Implemented core matching functionality, built the user
                  interface, and deployed the working application.
                </Text>
              </VStack>
            </Box>
          </HStack>
        </VStack>
      </Container>

      {/* Technology Stack */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="container.xl">
          <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
            Technology Stack
          </Heading>

          <SimpleGrid
            columns={{ base: 2, md: 4 }}
            spacing={8}
            maxW="container.md"
            mx="auto"
          >
            <VStack spacing={2}>
              <Text fontWeight="bold" color="brand.500">
                Frontend
              </Text>
              <Text>React.js</Text>
              <Text>Chakra UI</Text>
            </VStack>
            <VStack spacing={2}>
              <Text fontWeight="bold" color="brand.500">
                Backend
              </Text>
              <Text>Node.js</Text>
              <Text>Express.js</Text>
            </VStack>
            <VStack spacing={2}>
              <Text fontWeight="bold" color="brand.500">
                Database
              </Text>
              <Text>MongoDB</Text>
            </VStack>
            <VStack spacing={2}>
              <Text fontWeight="bold" color="brand.500">
                API
              </Text>
              <Text>GitHub API</Text>
              <Text>REST APIs</Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default About;
