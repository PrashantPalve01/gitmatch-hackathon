import React, { useState, useEffect } from "react";
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
import {
  getGitHubProfile,
  getStandardProfiles,
  createComparison,
} from "../services/api";
import { useNavigate } from "react-router-dom";

const NewComparison = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState(null);
  const [standardProfiles, setStandardProfiles] = useState([]);

  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.700");

  // Fetch standard profiles on component mount
  useEffect(() => {
    const fetchStandardProfiles = async () => {
      try {
        const profiles = await getStandardProfiles();
        setStandardProfiles(profiles);
        if (profiles.length > 0) {
          setSelectedProfile(profiles[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch standard profiles:", err);
        setError("Failed to load standard profiles. Please try again later.");
      }
    };

    fetchStandardProfiles();
  }, []);

  // Handle GitHub username search
  const handleSearch = async () => {
    if (!githubUsername.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const profileData = await getGitHubProfile(githubUsername);
      setPreviewData(profileData);
    } catch (err) {
      console.error("Error fetching GitHub profile:", err);
      setError("GitHub user not found");
      setPreviewData(null);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!previewData) {
      handleSearch();
      return;
    }

    if (!selectedProfile) {
      setError("Please select a standard profile");
      return;
    }

    setIsLoading(true);

    try {
      // Create a new comparison
      const result = await createComparison({
        githubUsername: githubUsername,
        standardProfileId: selectedProfile,
      });

      // Navigate to results page with the comparison ID
      navigate(`/results/${result.id}`);
    } catch (err) {
      console.error("Error creating comparison:", err);
      setError("Failed to create comparison. Please try again.");
      setIsLoading(false);
    }
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
                    isLoading={isSearching}
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
                      <Heading size="md">
                        {previewData.name || previewData.login}
                      </Heading>
                      <Text color="gray.500">@{previewData.login}</Text>
                      <Text mt="2">
                        {previewData.bio || "No bio available"}
                      </Text>
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
              isDisabled={!previewData || isLoading || !selectedProfile}
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
