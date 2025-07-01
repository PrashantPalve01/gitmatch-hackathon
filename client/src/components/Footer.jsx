import React from "react";
import {
  FaGithub,
  FaCode,
  FaUsers,
  FaSearch,
  FaDatabase,
} from "react-icons/fa";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Icon,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg={useColorModeValue("gray.800", "gray.900")} color="white" py="12">
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="8">
          <Box>
            <Heading size="md" mb="4">
              GitHub Recruiter
            </Heading>
            <Text fontSize="sm" mb="6" opacity="0.8">
              A hackathon project showcasing data-driven recruitment through
              GitHub analytics and algorithmic matching.
            </Text>
            <Flex>
              <Icon as={FaGithub} boxSize="6" mr="4" cursor="pointer" />
              <Icon as={FaCode} boxSize="6" cursor="pointer" />
            </Flex>
          </Box>

          <Box>
            <Heading size="sm" mb="4">
              Current Features
            </Heading>
            <Stack spacing="2" fontSize="sm">
              <Flex align="center">
                <Icon as={FaGithub} mr="2" />
                <Text>GitHub Integration</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaUsers} mr="2" />
                <Text>Profile Comparison</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaCode} mr="2" />
                <Text>Language Analysis</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaSearch} mr="2" />
                <Text>Candidate Search</Text>
              </Flex>
            </Stack>
          </Box>

          <Box>
            <Heading size="sm" mb="4">
              Technology Stack
            </Heading>
            <Stack spacing="2" fontSize="sm">
              <Text>React.js + Chakra UI</Text>
              <Text>Node.js + Express.js</Text>
              <Text>MongoDB Database</Text>
              <Text>GitHub REST API</Text>
              <Text>Algorithmic Scoring</Text>
            </Stack>
          </Box>

          <Box>
            <Heading size="sm" mb="4">
              Project Info
            </Heading>
            <Stack spacing="2" fontSize="sm">
              <Text>48-Hour Hackathon Build</Text>
              <Text>MERN Stack Implementation</Text>
              <Text>Real GitHub Data Analysis</Text>
              <Text>Weighted Recommendation Engine</Text>
              <Text opacity="0.7">AI Features Coming Soon</Text>
            </Stack>
          </Box>
        </SimpleGrid>

        <Divider my="8" opacity="0.2" />

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          fontSize="sm"
          opacity="0.7"
        >
          <Text>© 2025 GitHub Recruiter - Hackathon Project</Text>
          <Text mt={{ base: "2", md: "0" }}>
            Built with ❤️ using GitHub API & Algorithmic Intelligence
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
