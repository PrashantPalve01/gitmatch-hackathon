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
import { FaGithub, FaCode } from "react-icons/fa";
import Dashboard from "./Dashboard"; // Import the Dashboard component

const GitHubSkillSearch = () => {
  const [skills, setSkills] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hireStatus, setHireStatus] = useState({});
  // State to store hired candidates for the dashboard
  const [hiredCandidates, setHiredCandidates] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  
  const toast = useToast();
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

  // Save hired candidates to localStorage whenever the state changes
  useEffect(() => {
    if (hiredCandidates.length > 0) {
      localStorage.setItem("hiredCandidates", JSON.stringify(hiredCandidates));
    }
  }, [hiredCandidates]);

  const searchUsers = async () => {
    if (!skills.trim()) {
      setError("Please enter at least one skill");
      return;
    }

    setIsLoading(true);
    setError(null);
    setUsers([]);
    setHireStatus({});

    try {
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      
      // Fetch users for each skill
      const results = await Promise.all(skillsArray.map(async (skill) => {
        const response = await fetch(`https://api.github.com/search/users?q=${skill}+in:readme+in:description+language:${skill}&sort=followers&per_page=50`);
        const data = await response.json();
        return { skill, users: data.items || [] };
      }));
      
      // Create map to track unique users and their skills
      const userMap = new Map();
      
      results.forEach(({ skill, users }) => {
        users.forEach(user => {
          if (!userMap.has(user.login)) {
            userMap.set(user.login, {
              user,
              skills: [skill]
            });
          } else {
            userMap.get(user.login).skills.push(skill);
          }
        });
      });
      
      // Sort users by number of matching skills
      const sortedUsers = Array.from(userMap.values())
        .sort((a, b) => b.skills.length - a.skills.length);
      
      if (sortedUsers.length === 0) {
        setUsers([]);
        setIsLoading(false);
        return;
      }
      
      // Get detailed information for top 10 users
      const topUsers = sortedUsers.slice(0, 10);
      
      const detailedUsers = await Promise.all(topUsers.map(async ({ user, skills }) => {
        const response = await fetch(`https://api.github.com/users/${user.login}`);
        const userDetails = await response.json();
        return { userDetails, skills };
      }));
      
      setUsers(detailedUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
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

  const toggleView = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justifyContent="space-between" alignItems="center" mb="6">
        <Heading size="xl">
          {showDashboard ? "Dashboard" : "GitHub Skill Search"}
        </Heading>
        <Button 
          colorScheme="brand" 
          onClick={toggleView}
        >
          {showDashboard ? "Back to Search" : "View Dashboard"}
        </Button>
      </Flex>

      {showDashboard ? (
        <Dashboard hiredCandidates={hiredCandidates} />
      ) : (
        <Box>
          <Text color="gray.500" mb="8">
            Find top GitHub users based on programming skills
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing="8" align="stretch">
              {/* Skills Input */}
              <Card bg={cardBg} boxShadow="md">
                <CardBody>
                  <Heading size="md" mb="4" display="flex" alignItems="center">
                    <Icon as={FaCode} mr="2" />
                    Skills Search
                  </Heading>

                  <FormControl isRequired mb="4">
                    <FormLabel>Programming Skills</FormLabel>
                    <HStack>
                      <Input
                        placeholder="e.g., javascript, react, node"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      />
                      <Button
                        leftIcon={<SearchIcon />}
                        colorScheme="brand"
                        isLoading={isLoading}
                        onClick={searchUsers}
                        type="submit"
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
                            
                            <Flex mt="4" direction="column" gap="2">
                              <Button
                                as="a"
                                href={userDetails.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                colorScheme="brand"
                                w="full"
                              >
                                View Profile
                              </Button>
                              
                              <ButtonGroup isAttached width="full" mt="2">
                                <Button 
                                  colorScheme="green" 
                                  flex="1"
                                  size="sm"
                                  onClick={() => handleHireDecision(userDetails, skills, "hire")}
                                  variant={hireStatus[userDetails.id] === "hire" ? "solid" : "outline"}
                                >
                                  Hire
                                </Button>
                                <Button 
                                  colorScheme="red" 
                                  flex="1"
                                  size="sm"
                                  onClick={() => handleHireDecision(userDetails, skills, "no-hire")}
                                  variant={hireStatus[userDetails.id] === "no-hire" ? "solid" : "outline"}
                                >
                                  No Hire
                                </Button>
                              </ButtonGroup>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>
              )}

              {!isLoading && !error && users.length === 0 && skills.trim() && (
                <Alert status="info" borderRadius="md">
                  <AlertIcon as={InfoIcon} />
                  No users found with these skills. Try different skill combinations or check your spelling.
                </Alert>
              )}
            </VStack>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default GitHubSkillSearch;