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
  Center,
} from "@chakra-ui/react";
import { SearchIcon, InfoIcon, SettingsIcon } from "@chakra-ui/icons";
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
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);

  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.700");

  // Fetch standard profiles on component mount
  useEffect(() => {
    const fetchStandardProfiles = async () => {
      setIsLoadingProfiles(true);
      try {
        const profiles = await getStandardProfiles();
        setStandardProfiles(profiles);
        if (profiles.length > 0) {
          setSelectedProfile(profiles[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch standard profiles:", err);
        setError("Failed to load standard profiles. Please try again later.");
      } finally {
        setIsLoadingProfiles(false);
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
      setError(
        "GitHub user not found or something went wrong please try again"
      );
      setPreviewData(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleProfileChange = (value) => {
    console.log("Profile selected:", value);
    setSelectedProfile(value);
  };

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
      const comparisonResult = await createComparison({
        githubUsername: githubUsername,
        standardProfileId: selectedProfile,
      });

      // Navigate to results page with the comparison ID
      navigate(`/results/${comparisonResult._id}`);
    } catch (err) {
      console.error("Error creating comparison:", err);
      setError("Failed to create comparison. Please try again.");
      setIsLoading(false);
    }
  };

  const navigateToSettings = () => {
    navigate("/settings");
  };

  const isButtonDisabled =
    !previewData || isLoading || !standardProfiles.length || !selectedProfile;

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

              {isLoadingProfiles ? (
                <Center p="6">
                  <Text>Loading profiles...</Text>
                </Center>
              ) : standardProfiles.length > 0 ? (
                <>
                  <Text mb="4">
                    Choose a standard profile to compare against. Each profile
                    represents different expectations for a specific role or
                    experience level.
                  </Text>

                  <FormControl as="fieldset" isRequired>
                    <FormLabel as="legend">Standard Profile</FormLabel>
                    <RadioGroup
                      value={selectedProfile}
                      onChange={handleProfileChange}
                    >
                      <Stack spacing="4">
                        {standardProfiles.map((profile) => (
                          <Card
                            key={profile._id}
                            variant="outline"
                            borderColor={
                              selectedProfile === profile._id
                                ? "brand.500"
                                : "gray.200"
                            }
                            borderWidth={
                              selectedProfile === profile._id ? "2px" : "1px"
                            }
                            onClick={() => handleProfileChange(profile._id)}
                            cursor="pointer"
                          >
                            <CardBody py="3">
                              <Radio
                                value={profile._id}
                                colorScheme="brand"
                                isChecked={selectedProfile === profile._id}
                              >
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
                </>
              ) : (
                <Box textAlign="center" py="8">
                  <Alert status="warning" borderRadius="md" mb="6">
                    <AlertIcon />
                    No standard profiles available. You need to create at least
                    one profile to make comparisons.
                  </Alert>
                  <Button
                    colorScheme="brand"
                    size="md"
                    onClick={navigateToSettings}
                  >
                    Go to Create Profiles
                  </Button>
                </Box>
              )}
            </CardBody>
          </Card>

          {/* Submit Button */}
          <Flex justifyContent="center">
            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              px="12"
              isDisabled={isButtonDisabled || standardProfiles.length === 0}
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
