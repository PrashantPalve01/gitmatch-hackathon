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
  SimpleGrid,
  Badge,
  Spinner,
  Container,
  ButtonGroup,
  useToast,
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
  const badgeBg = useColorModeValue("brand.100", "brand.800");
  const badgeColor = useColorModeValue("brand.800", "brand.100");

  // Load any existing hiring decisions from localStorage on component mount
  useEffect(() => {
    const savedHiredCandidates = localStorage.getItem("hiredCandidates");
    if (savedHiredCandidates) {
      setHiredCandidates(JSON.parse(savedHiredCandidates));
    }
  }, []);
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
    setUsers([]);
    setHireStatus({});

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
    searchUsers();
  };

  const handleHireDecision = (userDetails, skills, decision) => {
    setHireStatus(prev => ({
      ...prev,
      [userDetails.id]: decision
    }));
    
    // If decision is "hire", add candidate to hiredCandidates array
    if (decision === "hire") {
      // Create a candidate object with formatted data for Dashboard
      const candidate = {
        id: userDetails.id,
        name: userDetails.name,
        login: userDetails.login,
        skills: skills,
        avatarUrl: userDetails.avatar_url,
        bio: userDetails.bio,
        url: userDetails.html_url,
        repos: userDetails.public_repos,
        followers: userDetails.followers,
        decision: "hire",
        dateAdded: new Date().toISOString()
      };
      
      // Check if candidate already exists
      const existingIndex = hiredCandidates.findIndex(c => c.id === userDetails.id);
      
      if (existingIndex >= 0) {
        // Update existing candidate
        const updatedCandidates = [...hiredCandidates];
        updatedCandidates[existingIndex] = candidate;
        setHiredCandidates(updatedCandidates);
      } else {
        // Add new candidate
        setHiredCandidates(prev => [...prev, candidate]);
      }
      
      toast({
        title: "Candidate Added",
        description: `${userDetails.name || userDetails.login} has been added to hiring list.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (decision === "no-hire") {
      // Remove the candidate from hired list if they were previously hired
      setHiredCandidates(prev => prev.filter(candidate => candidate.id !== userDetails.id));
      
      toast({
        title: "Candidate Removed",
        description: `${userDetails.name || userDetails.login} has been removed from hiring list.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };
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
                        Search
                      </Button>
                    </HStack>
                    <Text fontSize="sm" color="gray.500" mt="2">
                      Enter skills separated by commas (e.g., javascript, react, python)
                    </Text>
                  </FormControl>

                  {error && (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
                </CardBody>
              </Card>

              {/* Loading indicator */}
              {isLoading && (
                <Flex justify="center" align="center" direction="column" py={6}>
                  <Spinner size="xl" color="brand.500" mb={4} />
                  <Text>Searching for top GitHub users with these skills...</Text>
                </Flex>
              )}

              {/* Results */}
              {!isLoading && users.length > 0 && (
                <Card bg={cardBg} boxShadow="md">
                  <CardBody>
                    <Heading size="md" mb="4" display="flex" alignItems="center">
                      <Icon as={FaGithub} mr="2" />
                      Top Users ({users.length})
                    </Heading>
                    
                    <Divider mb="6" />
                    
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                      {users.map(({ userDetails, skills }) => (
                        <Card 
                          key={userDetails.id} 
                          variant="outline" 
                          overflow="hidden"
                          borderColor={
                            hireStatus[userDetails.id] === "hire" 
                              ? "green.400" 
                              : hireStatus[userDetails.id] === "no-hire" 
                                ? "red.400" 
                                : "gray.200"
                          }
                          borderWidth={hireStatus[userDetails.id] ? "2px" : "1px"}
                        >
                          <CardBody>
                            <Flex>
                              <Image
                                src={userDetails.avatar_url}
                                alt={userDetails.login}
                                boxSize="80px"
                                borderRadius="full"
                                mr="4"
                              />
                              <Box>
                                <Heading size="md">{userDetails.name || userDetails.login}</Heading>
                                <Text color="gray.500">@{userDetails.login}</Text>
                                {userDetails.bio && (
                                  <Text mt="2" fontSize="sm" noOfLines={2}>
                                    {userDetails.bio}
                                  </Text>
                                )}
                                <HStack mt="2" spacing="4">
                                  <Text fontSize="sm">
                                    {userDetails.public_repos || 0} repos
                                  </Text>
                                  <Text fontSize="sm">
                                    {userDetails.followers || 0} followers
                                  </Text>
                                </HStack>
                              </Box>
                            </Flex>
                            
                            <Divider my="3" />
                            
                            <Box>
                              <Text fontSize="sm" fontWeight="bold" mb="2">
                                Matching Skills:
                              </Text>
                              <Flex wrap="wrap" gap="2">
                                {skills.map((skill, index) => (
                                  <Badge
                                    key={index}
                                    bg={badgeBg}
                                    color={badgeColor}
                                    px="2"
                                    py="1"
                                    borderRadius="full"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </Flex>
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