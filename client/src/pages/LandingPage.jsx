import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Icon,
  Image,
  Card,
  CardBody,
  Badge,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  chakra,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CheckCircleIcon, ArrowForwardIcon, StarIcon } from "@chakra-ui/icons";
import { FaGithub, FaCode, FaUserCheck, FaChartLine } from "react-icons/fa";

const LandingPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const brandGradient = useColorModeValue(
    "linear(to-r, brand.400, brand.600)",
    "linear(to-r, brand.500, brand.700)"
  );
  const highlightColor = useColorModeValue("brand.500", "brand.300");

  return (
    <Box bg={bgColor}>
      {/* Hero Section */}
      <Box
        bgGradient={brandGradient}
        color="white"
        pt={{ base: "12", md: "24" }}
        pb={{ base: "16", md: "32" }}
      >
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="12">
            <Box>
              <Heading
                as="h1"
                size="3xl"
                fontWeight="extrabold"
                lineHeight="shorter"
                mb="6"
              >
                Find the{" "}
                <chakra.span
                  bgGradient="linear(to-r, yellow.400, yellow.300)"
                  bgClip="text"
                >
                  perfect developer
                </chakra.span>{" "}
                using GitHub data
              </Heading>
              <Text fontSize="xl" mb="8" maxW="container.md">
                Evaluate developer candidates objectively using their GitHub
                profiles. Compare metrics, analyze coding patterns, and make
                data-driven hiring decisions.
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} spacing="4">
                <Button
                  as={RouterLink}
                  to="/signup"
                  size="lg"
                  colorScheme="white"
                  bg="white"
                  color="brand.600"
                  _hover={{ bg: "gray.100" }}
                  fontWeight="bold"
                  px="8"
                  rightIcon={<ArrowForwardIcon />}
                >
                  Get Started
                </Button>
                <Button
                  as={RouterLink}
                  to="/login"
                  size="lg"
                  variant="outline"
                  colorScheme="white"
                  fontWeight="bold"
                  leftIcon={<FaGithub />}
                >
                  Sign in with GitHub
                </Button>
              </Stack>
            </Box>
            <Flex justify="center" align="center">
              <Image
                src="/api/placeholder/600/400"
                alt="GitHub Recruiter Dashboard"
                borderRadius="xl"
                shadow="2xl"
              />
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py="16">
        <Heading textAlign="center" mb="12">
          Streamline Your Technical Hiring
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="10">
          <Card bg={cardBg} shadow="md" height="full">
            <CardBody>
              <Flex
                w="16"
                h="16"
                align="center"
                justify="center"
                color="white"
                rounded="full"
                bg={highlightColor}
                mb="4"
              >
                <Icon as={FaGithub} boxSize="8" />
              </Flex>
              <Heading size="md" mb="4">
                GitHub Integration
              </Heading>
              <Text>
                Connect directly to GitHub's API to analyze candidate profiles.
                Pull repositories, commit history, language usage, and more.
              </Text>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md" height="full">
            <CardBody>
              <Flex
                w="16"
                h="16"
                align="center"
                justify="center"
                color="white"
                rounded="full"
                bg={highlightColor}
                mb="4"
              >
                <Icon as={FaChartLine} boxSize="8" />
              </Flex>
              <Heading size="md" mb="4">
                Advanced Metrics
              </Heading>
              <Text>
                Evaluate candidates using multiple dimensions: code quality,
                contribution frequency, language proficiency, and community
                engagement.
              </Text>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md" height="full">
            <CardBody>
              <Flex
                w="16"
                h="16"
                align="center"
                justify="center"
                color="white"
                rounded="full"
                bg={highlightColor}
                mb="4"
              >
                <Icon as={FaUserCheck} boxSize="8" />
              </Flex>
              <Heading size="md" mb="4">
                Standardized Profiles
              </Heading>
              <Text>
                Compare candidates against role-specific benchmarks. Create
                custom profiles for different positions and seniority levels.
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>

      {/* How It Works Section */}
      <Box bg={useColorModeValue("gray.100", "gray.800")} py="16">
        <Container maxW="container.xl">
          <Heading textAlign="center" mb="12">
            How It Works
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="10">
            <Box>
              <Flex
                w="12"
                h="12"
                align="center"
                justify="center"
                color="white"
                rounded="full"
                bg={highlightColor}
                mb="4"
                mx="auto"
              >
                <Text fontWeight="bold">1</Text>
              </Flex>
              <Heading size="md" textAlign="center" mb="4">
                Enter GitHub Username
              </Heading>
              <Text textAlign="center">
                Simply enter a candidate's GitHub username to begin the
                evaluation process.
              </Text>
            </Box>

            <Box>
              <Flex
                w="12"
                h="12"
                align="center"
                justify="center"
                color="white"
                rounded="full"
                bg={highlightColor}
                mb="4"
                mx="auto"
              >
                <Text fontWeight="bold">2</Text>
              </Flex>
              <Heading size="md" textAlign="center" mb="4">
                Select a Standard Profile
              </Heading>
              <Text textAlign="center">
                Choose from predefined role standards or create your own custom
                profiles with specific metrics.
              </Text>
            </Box>

            <Box>
              <Flex
                w="12"
                h="12"
                align="center"
                justify="center"
                color="white"
                rounded="full"
                bg={highlightColor}
                mb="4"
                mx="auto"
              >
                <Text fontWeight="bold">3</Text>
              </Flex>
              <Heading size="md" textAlign="center" mb="4">
                Review Detailed Analysis
              </Heading>
              <Text textAlign="center">
                Get comprehensive insights with visual metrics, strengths,
                weaknesses, and an overall recommendation.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxW="container.xl" py="16">
        <Heading textAlign="center" mb="12">
          What Hiring Managers Say
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="10">
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <Flex direction="column" height="full">
                <Flex mb="4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon key={i} as={StarIcon} color="yellow.400" />
                  ))}
                </Flex>
                <Text mb="4" flex="1">
                  "GitHub Recruiter has completely transformed our technical
                  hiring process. We can now evaluate candidates objectively
                  based on their actual code contributions rather than just
                  resume claims."
                </Text>
                <Flex align="center">
                  <Image
                    src="/api/placeholder/50/50"
                    alt="Sarah Johnson"
                    borderRadius="full"
                    boxSize="40px"
                    mr="3"
                  />
                  <Box>
                    <Text fontWeight="bold">Sarah Johnson</Text>
                    <Text fontSize="sm" color="gray.500">
                      CTO, TechInnovate
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md">
            <CardBody>
              <Flex direction="column" height="full">
                <Flex mb="4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon key={i} as={StarIcon} color="yellow.400" />
                  ))}
                </Flex>
                <Text mb="4" flex="1">
                  "The standardized profiles feature is a game-changer. We've
                  created custom profiles for every role in our engineering
                  team, making hiring consistent and data-driven."
                </Text>
                <Flex align="center">
                  <Image
                    src="/api/placeholder/50/50"
                    alt="David Chen"
                    borderRadius="full"
                    boxSize="40px"
                    mr="3"
                  />
                  <Box>
                    <Text fontWeight="bold">David Chen</Text>
                    <Text fontSize="sm" color="gray.500">
                      Engineering Manager, CodeCorp
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md">
            <CardBody>
              <Flex direction="column" height="full">
                <Flex mb="4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon key={i} as={StarIcon} color="yellow.400" />
                  ))}
                </Flex>
                <Text mb="4" flex="1">
                  "We've reduced our hiring time by 40% while improving the
                  quality of our technical hires. The visualizations make it
                  easy to communicate findings with non-technical stakeholders."
                </Text>
                <Flex align="center">
                  <Image
                    src="/api/placeholder/50/50"
                    alt="Emily Rodriguez"
                    borderRadius="full"
                    boxSize="40px"
                    mr="3"
                  />
                  <Box>
                    <Text fontWeight="bold">Emily Rodriguez</Text>
                    <Text fontSize="sm" color="gray.500">
                      Head of Talent, StartupX
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>

      {/* Pricing Section */}
      <Box bg={useColorModeValue("gray.100", "gray.800")} py="16">
        <Container maxW="container.xl">
          <Heading textAlign="center" mb="4">
            Pricing Plans
          </Heading>
          <Text textAlign="center" maxW="container.md" mx="auto" mb="12">
            Choose the right plan for your hiring needs. All plans include
            access to basic GitHub metrics and standard profiles.
          </Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="10">
            <Card
              bg={cardBg}
              shadow="lg"
              borderColor="gray.200"
              borderWidth="1px"
            >
              <CardBody p="6">
                <Badge colorScheme="blue" mb="2">
                  Basic
                </Badge>
                <Heading size="xl" mb="2">
                  $0
                </Heading>
                <Text color="gray.500" mb="6">
                  Free forever
                </Text>

                <List spacing="3" mb="8">
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />5 profile
                    analyses per month
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />3
                    standard profiles
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Basic metrics and charts
                  </ListItem>
                </List>

                <Button
                  as={RouterLink}
                  to="/signup"
                  colorScheme="brand"
                  variant="outline"
                  w="full"
                >
                  Sign Up Free
                </Button>
              </CardBody>
            </Card>

            <Card
              bg={cardBg}
              shadow="lg"
              borderColor="brand.500"
              borderWidth="2px"
              transform={{ base: "none", md: "scale(1.05)" }}
            >
              <CardBody p="6">
                <Badge colorScheme="brand" mb="2">
                  Pro
                </Badge>
                <Heading size="xl" mb="2">
                  $49
                </Heading>
                <Text color="gray.500" mb="6">
                  per month
                </Text>

                <List spacing="3" mb="8">
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text as="span" fontWeight="bold">
                      Unlimited
                    </Text>{" "}
                    profile analyses
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    10 custom standard profiles
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Advanced metrics and insights
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Export results and reports
                  </ListItem>
                </List>

                <Button
                  as={RouterLink}
                  to="/signup?plan=pro"
                  colorScheme="brand"
                  w="full"
                >
                  Get Started
                </Button>
              </CardBody>
            </Card>

            <Card
              bg={cardBg}
              shadow="lg"
              borderColor="gray.200"
              borderWidth="1px"
            >
              <CardBody p="6">
                <Badge colorScheme="purple" mb="2">
                  Enterprise
                </Badge>
                <Heading size="xl" mb="2">
                  Custom
                </Heading>
                <Text color="gray.500" mb="6">
                  tailored pricing
                </Text>

                <List spacing="3" mb="8">
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Everything in Pro plan
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Unlimited standard profiles
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    ATS integration
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Dedicated account manager
                  </ListItem>
                </List>

                <Button
                  as={RouterLink}
                  to="/contact"
                  colorScheme="purple"
                  variant="outline"
                  w="full"
                >
                  Contact Sales
                </Button>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bgGradient={brandGradient} color="white" py="16">
        <Container maxW="container.lg" textAlign="center">
          <Heading mb="6">Ready to transform your technical hiring?</Heading>
          <Text fontSize="xl" maxW="container.md" mx="auto" mb="8">
            Join thousands of companies making data-driven hiring decisions with
            GitHub Recruiter.
          </Text>
          <Button
            as={RouterLink}
            to="/signup"
            size="lg"
            colorScheme="white"
            bg="white"
            color="brand.600"
            _hover={{ bg: "gray.100" }}
            fontWeight="bold"
            px="8"
            rightIcon={<ArrowForwardIcon />}
          >
            Get Started Today
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg={useColorModeValue("gray.800", "gray.900")} color="white" py="12">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing="8">
            <Box>
              <Heading size="md" mb="4">
                GitHub Recruiter
              </Heading>
              <Text fontSize="sm" mb="6" opacity="0.8">
                Making technical hiring objective and data-driven since 2023.
              </Text>
              <Flex>
                <Icon as={FaGithub} boxSize="6" mr="4" cursor="pointer" />
                <Icon as={FaCode} boxSize="6" cursor="pointer" />
              </Flex>
            </Box>

            <Box>
              <Heading size="sm" mb="4">
                Product
              </Heading>
              <Stack spacing="2" fontSize="sm">
                <Text cursor="pointer">Features</Text>
                <Text cursor="pointer">Pricing</Text>
                <Text cursor="pointer">Case Studies</Text>
                <Text cursor="pointer">Testimonials</Text>
              </Stack>
            </Box>

            <Box>
              <Heading size="sm" mb="4">
                Resources
              </Heading>
              <Stack spacing="2" fontSize="sm">
                <Text cursor="pointer">Documentation</Text>
                <Text cursor="pointer">API Reference</Text>
                <Text cursor="pointer">Blog</Text>
                <Text cursor="pointer">Guides</Text>
              </Stack>
            </Box>

            <Box>
              <Heading size="sm" mb="4">
                Company
              </Heading>
              <Stack spacing="2" fontSize="sm">
                <Text cursor="pointer">About Us</Text>
                <Text cursor="pointer">Careers</Text>
                <Text cursor="pointer">Contact</Text>
                <Text cursor="pointer">Privacy Policy</Text>
              </Stack>
            </Box>
          </SimpleGrid>

          {/* <Divider my="8" opacity="0.2" /> */}
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
