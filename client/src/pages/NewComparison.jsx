import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Card,
  CardBody,
  Divider,
  Icon,
  Image,
  Alert,
  AlertIcon,
  Flex,
  useColorModeValue,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon, InfoIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";

// Mock standard profiles for development
const standardProfiles = [
  {
    id: "1",
    name: "Junior Frontend Developer",
    description:
      "Entry-level frontend developer with basic JavaScript and React knowledge",
  },
  {
    id: "2",
    name: "Mid-level Full Stack Developer",
    description: "Experienced developer with frontend and backend skills",
  },
  {
    id: "3",
    name: "Senior Backend Developer",
    description:
      "Expert backend developer with system design and architecture experience",
  },
];

const NewComparison = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState(null);

  const cardBg = useColorModeValue("white", "gray.700");

  // Mock function to handle GitHub username search
  const handleSearch = () => {
    if (!githubUsername.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock successful response
      if (githubUsername.toLowerCase() !== "invalid") {
        setPreviewData({
          avatar_url: "https://via.placeholder.com/150",
          name: "Prashant Palve",
          login: githubUsername,
          bio: "This is a mock GitHub profile for development purposes",
          public_repos: 25,
          followers: 120,
        });
      } else {
        setError("GitHub user not found");
        setPreviewData(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewData) {
      handleSearch();
      return;
    }

    // Here you would navigate to results page with actual data
    alert(
      `Starting comparison for ${githubUsername} using profile ${selectedProfile}`
    );
    // In real implementation, you would:
    // 1. Call your API to start the comparison process
    // 2. Navigate to a loading or results page
  };

  return (
    <Box>
      <Heading size="xl" mb="2">
        New Comparison
      </Heading>
      <Text color="gray.500" mb="8">
        Compare a GitHub profile against standard developer profiles
      </Text>

      <form onSubmit={handleSubmit}>
        <VStack spacing="8" align="stretch">
          {/* GitHub Username Input */}
          <Card bg={cardBg} boxShadow="md">
            <CardBody>
              <Heading size="md" mb="4" display="flex" alignItems="center">
                <Icon as={FaGithub} mr="2" />
                GitHub Profile
              </Heading>

              <FormControl isRequired mb="4">
                <FormLabel>GitHub Username</FormLabel>
                <HStack>
                  <Input
                    placeholder="e.g., octocat"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                  />
                  <Button
                    leftIcon={<SearchIcon />}
                    colorScheme="brand"
                    isLoading={isLoading}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </HStack>
              </FormControl>

              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              {previewData && (
                <Box mt="4">
                  <Divider mb="4" />
                  <Flex>
                    <Image
                      src={previewData.avatar_url}
                      alt={previewData.login}
                      boxSize="80px"
                      borderRadius="full"
                      mr="4"
                    />
                    <Box>
                      <Heading size="md">{previewData.name}</Heading>
                      <Text color="gray.500">@{previewData.login}</Text>
                      <Text mt="2">{previewData.bio}</Text>
                      <HStack mt="2" spacing="4">
                        <Text fontSize="sm">
                          {previewData.public_repos} repositories
                        </Text>
                        <Text fontSize="sm">
                          {previewData.followers} followers
                        </Text>
                      </HStack>
                    </Box>
                  </Flex>
                </Box>
              )}
            </CardBody>
          </Card>

          {/* Standard Profile Selection */}
          <Card bg={cardBg} boxShadow="md">
            <CardBody>
              <Heading size="md" mb="4">
                Select Standard Profile
              </Heading>
              <Text mb="4">
                Choose a standard profile to compare against. Each profile
                represents different expectations for a specific role or
                experience level.
              </Text>

              <FormControl as="fieldset" isRequired>
                <FormLabel as="legend">Standard Profile</FormLabel>
                <RadioGroup
                  value={selectedProfile}
                  onChange={setSelectedProfile}
                >
                  <Stack spacing="4">
                    {standardProfiles.map((profile) => (
                      <Card
                        key={profile.id}
                        variant="outline"
                        borderColor={
                          selectedProfile === profile.id
                            ? "brand.500"
                            : "gray.200"
                        }
                        borderWidth={
                          selectedProfile === profile.id ? "2px" : "1px"
                        }
                      >
                        <CardBody py="3">
                          <Radio value={profile.id} colorScheme="brand">
                            <Box ml="2">
                              <Text fontWeight="bold">{profile.name}</Text>
                              <Text fontSize="sm" color="gray.500">
                                {profile.description}
                              </Text>
                            </Box>
                          </Radio>
                        </CardBody>
                      </Card>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>
            </CardBody>
          </Card>

          {/* Submit Button */}
          <Flex justifyContent="center">
            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              px="12"
              isDisabled={!githubUsername.trim() || isLoading}
              isLoading={isLoading}
            >
              Start Comparison
            </Button>
          </Flex>

          <Alert status="info" borderRadius="md">
            <AlertIcon as={InfoIcon} />
            This will analyze the GitHub profile and compare it against the
            selected standard profile. The process may take a few seconds.
          </Alert>
        </VStack>
      </form>
    </Box>
  );
};

export default NewComparison;
