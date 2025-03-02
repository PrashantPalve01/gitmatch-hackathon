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
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaLightbulb,
  FaUsers,
  FaRocket,
  FaCode,
} from "react-icons/fa";
import Footer from "../components/Footer";

const TeamMember = ({ name, role, description, imageUrl }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      bg={cardBg}
      p={5}
      rounded="lg"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="md"
    >
      <Flex direction="column" align="center">
        <Image
          src={imageUrl || "/api/placeholder/150/150"}
          alt={name}
          borderRadius="full"
          boxSize="150px"
          objectFit="cover"
          mb={4}
        />
        <Heading size="md" mb={1} textAlign="center">
          {name}
        </Heading>
        <Text color="brand.500" fontWeight="medium" mb={3} textAlign="center">
          {role}
        </Text>
        <Text
          color={useColorModeValue("gray.600", "gray.300")}
          textAlign="center"
          mb={4}
        >
          {description}
        </Text>
        <HStack spacing={3}>
          <Icon
            as={FaLinkedin}
            boxSize={5}
            color="gray.500"
            cursor="pointer"
            _hover={{ color: "brand.500" }}
          />
          <Icon
            as={FaGithub}
            boxSize={5}
            color="gray.500"
            cursor="pointer"
            _hover={{ color: "brand.500" }}
          />
          <Icon
            as={FaTwitter}
            boxSize={5}
            color="gray.500"
            cursor="pointer"
            _hover={{ color: "brand.500" }}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

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

  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      description:
        "Former tech recruiter with 10+ years of experience who believed there was a better way to evaluate engineering talent.",
      imageUrl: "", // Will use placeholder
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description:
        "Full-stack developer with expertise in GitHub's API ecosystem and algorithmic assessment of code quality.",
      imageUrl: "", // Will use placeholder
    },
    {
      name: "Marcus Johnson",
      role: "Lead Data Scientist",
      description:
        "PhD in Computer Science specializing in developer productivity metrics and predictive modeling.",
      imageUrl: "", // Will use placeholder
    },
    {
      name: "Maya Patel",
      role: "Head of Product",
      description:
        "10 years of product experience at tech companies, focusing on recruitment tools and developer platforms.",
      imageUrl: "", // Will use placeholder
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="brand.500" color="white" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={4} align="start" maxW="container.md">
            <Heading size="2xl">Our Mission</Heading>
            <Text fontSize="xl">
              We're transforming technical recruiting by replacing gut feelings
              with data-driven insights. GitHub Recruiter helps companies
              identify exceptional engineering talent based on real code and
              real contributions.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Heading size="xl" mb={6} color={headingColor}>
              Our Story
            </Heading>
            <VStack spacing={4} align="start">
              <Text>
                GitHub Recruiter began in 2022 during a 48-hour hackathon when
                our founder, Alex, was frustrated with the traditional technical
                recruiting process. As an engineering manager, he spent
                countless hours reviewing resumes that didn't reflect
                candidates' actual abilities.
              </Text>
              <Text>
                The insight was simple but powerful: a developer's GitHub
                profile reveals more about their skills, work ethic, and coding
                style than any resume or interview could. The hackathon project
                won first place, and within months, we had built a prototype
                that was being used by tech recruiters across Silicon Valley.
              </Text>
              <Text>
                Today, GitHub Recruiter helps hundreds of companies make better
                hiring decisions by analyzing real code contributions and
                development patterns. Our mission is to create a more
                meritocratic hiring process that benefits both companies and
                developers.
              </Text>
            </VStack>
          </Box>
          <Flex justify="center" align="center">
            <Image
              src="/api/placeholder/500/400"
              alt="Team working together"
              rounded="lg"
              shadow="lg"
            />
          </Flex>
        </SimpleGrid>
      </Container>

      {/* Our Values */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="container.xl">
          <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
            Our Values
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <ValueCard
              icon={FaCode}
              title="Code Tells the Truth"
              description="We believe that real code contributions and development history are the most authentic indicators of a developer's capabilities."
            />
            <ValueCard
              icon={FaLightbulb}
              title="Data Over Intuition"
              description="Our decisions and recommendations are guided by objective data analysis rather than subjective impressions."
            />
            <ValueCard
              icon={FaUsers}
              title="Diversity Through Merit"
              description="By focusing on actual code and contributions, we help create more diverse engineering teams based on skill, not background."
            />
            <ValueCard
              icon={FaRocket}
              title="Continuous Improvement"
              description="Like the developers we evaluate, we constantly iterate on our algorithms and metrics to deliver better insights."
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="container.xl">
          <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
            Our Journey
          </Heading>

          <VStack spacing={8} align="stretch" maxW="container.md" mx="auto">
            <HStack spacing={6} align="start">
              <Box minW="100px" textAlign="right">
                <Text fontWeight="bold">2022</Text>
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
                  <Heading size="sm">The Hackathon</Heading>
                  <Text color={useColorModeValue("gray.600", "gray.300")}>
                    GitHub Recruiter wins first place at TechCrunch Disrupt
                    Hackathon, catching the attention of early angel investors.
                  </Text>
                </VStack>
              </Box>
            </HStack>

            <HStack spacing={6} align="start">
              <Box minW="100px" textAlign="right">
                <Text fontWeight="bold">2023</Text>
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
                  <Heading size="sm">Seed Funding & Launch</Heading>
                  <Text color={useColorModeValue("gray.600", "gray.300")}>
                    Secured $2.5M in seed funding and launched the first
                    production version with 50 beta customers.
                  </Text>
                </VStack>
              </Box>
            </HStack>

            <HStack spacing={6} align="start">
              <Box minW="100px" textAlign="right">
                <Text fontWeight="bold">2024</Text>
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
                  <Heading size="sm">Series A & Growth</Heading>
                  <Text color={useColorModeValue("gray.600", "gray.300")}>
                    Raised $10M Series A funding, expanded to 500+ customers,
                    and launched advanced analytics features powered by AI.
                  </Text>
                </VStack>
              </Box>
            </HStack>

            <HStack spacing={6} align="start">
              <Box minW="100px" textAlign="right">
                <Text fontWeight="bold">2025</Text>
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
                  <Heading size="sm">Today & Beyond</Heading>
                  <Text color={useColorModeValue("gray.600", "gray.300")}>
                    Now serving 1,000+ companies globally with 30 team members
                    and a roadmap focused on integrating with more developer
                    platforms.
                  </Text>
                </VStack>
              </Box>
            </HStack>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;
