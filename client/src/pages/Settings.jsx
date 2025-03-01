import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Badge,
  Flex,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Select,
  Tooltip,
  Progress,
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  SettingsIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import {
  FaCode,
  FaGithub,
  FaCog,
  FaUserAlt,
  FaChartLine,
} from "react-icons/fa";

// Mock standard profiles
const mockStandardProfiles = [
  {
    id: "1",
    name: "Junior Frontend Developer",
    description:
      "Entry-level frontend developer with basic JavaScript and React knowledge",
    metrics: {
      commit_frequency: 60,
      code_quality: 70,
      language_proficiency: 60,
      project_diversity: 50,
      community_engagement: 40,
    },
  },
  {
    id: "2",
    name: "Mid-level Full Stack Developer",
    description: "Experienced developer with frontend and backend skills",
    metrics: {
      commit_frequency: 75,
      code_quality: 80,
      language_proficiency: 75,
      project_diversity: 70,
      community_engagement: 65,
    },
  },
  {
    id: "3",
    name: "Senior Backend Developer",
    description:
      "Expert backend developer with system design and architecture experience",
    metrics: {
      commit_frequency: 85,
      code_quality: 90,
      language_proficiency: 85,
      project_diversity: 80,
      community_engagement: 75,
    },
  },
];

const Settings = () => {
  const [standardProfiles, setStandardProfiles] =
    useState(mockStandardProfiles);
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    metrics: {
      commit_frequency: 70,
      code_quality: 70,
      language_proficiency: 70,
      project_diversity: 70,
      community_engagement: 70,
    },
  });

  // App settings state
  const [appSettings, setAppSettings] = useState({
    githubApiKey: "",
    autoRefreshResults: true,
    defaultProfile: "2",
    scoringThreshold: 70,
    saveHistoricalData: true,
    dataRetentionDays: 30,
    notifyOnCompletion: true,
  });

  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const [profileToDelete, setProfileToDelete] = useState(null);

  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Handle metric slider changes for profile creation/editing
  const handleMetricChange = (metric, value) => {
    setFormData({
      ...formData,
      metrics: {
        ...formData.metrics,
        [metric]: value,
      },
    });
  };

  // Handle form input changes for profile creation/editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle app settings changes
  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppSettings({
      ...appSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle slider changes for app settings
  const handleSettingSliderChange = (name, value) => {
    setAppSettings({
      ...appSettings,
      [name]: value,
    });
  };

  // Edit profile handler
  const handleEditProfile = (profile) => {
    setEditingProfile(profile.id);
    setFormData({
      name: profile.name,
      description: profile.description,
      metrics: { ...profile.metrics },
    });
    onOpen();
  };

  // Delete profile confirmation handler
  const handleDeleteClick = (profileId) => {
    setProfileToDelete(profileId);
    onDeleteOpen();
  };

  // Actual delete profile handler
  const handleDeleteProfile = () => {
    setStandardProfiles(
      standardProfiles.filter((profile) => profile.id !== profileToDelete)
    );
    onDeleteClose();

    toast({
      title: "Profile deleted.",
      description: "The standard profile has been removed.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  // Open modal for creating new profile
  const handleAddNewProfile = () => {
    setEditingProfile(null);
    setFormData({
      name: "",
      description: "",
      metrics: {
        commit_frequency: 70,
        code_quality: 70,
        language_proficiency: 70,
        project_diversity: 70,
        community_engagement: 70,
      },
    });
    onOpen();
  };

  // Submit handler for profile creation/editing
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProfile) {
      // Update existing profile
      setStandardProfiles(
        standardProfiles.map((profile) =>
          profile.id === editingProfile
            ? {
                ...profile,
                name: formData.name,
                description: formData.description,
                metrics: formData.metrics,
              }
            : profile
        )
      );

      toast({
        title: "Profile updated.",
        description: `Standard profile "${formData.name}" has been updated.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Add new profile
      const newProfile = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        metrics: formData.metrics,
      };

      setStandardProfiles([...standardProfiles, newProfile]);

      toast({
        title: "Profile created.",
        description: `Standard profile "${formData.name}" has been created.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    // Reset form and close modal
    setFormData({
      name: "",
      description: "",
      metrics: {
        commit_frequency: 70,
        code_quality: 70,
        language_proficiency: 70,
        project_diversity: 70,
        community_engagement: 70,
      },
    });

    onClose();
  };

  // Save app settings handler
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved.",
      description: "Your application settings have been updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // Helper function to render metric sliders
  const renderMetricSlider = (label, metric) => (
    <FormControl mb="4">
      <FormLabel>{label}</FormLabel>
      <Flex align="center">
        <Slider
          value={formData.metrics[metric]}
          onChange={(val) => handleMetricChange(metric, val)}
          min={0}
          max={100}
          step={5}
          flex="1"
          colorScheme="brand"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="brand.500">{formData.metrics[metric]}</Box>
          </SliderThumb>
        </Slider>
        <Text ml="4" fontWeight="bold" minW="36px" textAlign="center">
          {formData.metrics[metric]}%
        </Text>
      </Flex>
    </FormControl>
  );

  return (
    <Box>
      <Heading size="xl" mb="2">
        Settings
      </Heading>
      <Text color="gray.500" mb="8">
        Configure application settings and manage standard profiles
      </Text>

      <Tabs colorScheme="brand" variant="enclosed">
        <TabList mb="4">
          <Tab>
            <Icon as={FaGithub} mr="2" /> Standard Profiles
          </Tab>
          <Tab>
            <Icon as={FaCog} mr="2" /> App Settings
          </Tab>
        </TabList>

        <TabPanels>
          {/* Standard Profiles Tab */}
          <TabPanel p="0">
            <Card bg={cardBg} boxShadow="md" mb="6">
              <CardHeader pb="2">
                <Flex justify="space-between" align="center">
                  <Heading size="md">Standard Developer Profiles</Heading>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="brand"
                    size="sm"
                    onClick={handleAddNewProfile}
                  >
                    Add New Profile
                  </Button>
                </Flex>
                <Text color="gray.500" fontSize="sm">
                  These profiles serve as comparison benchmarks for evaluating
                  GitHub profiles
                </Text>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Profile Name</Th>
                      <Th>Description</Th>
                      <Th>Average Metrics</Th>
                      <Th width="150px">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {standardProfiles.map((profile) => (
                      <Tr key={profile.id}>
                        <Td fontWeight="medium">{profile.name}</Td>
                        <Td>{profile.description}</Td>
                        <Td>
                          {Math.round(
                            Object.values(profile.metrics).reduce(
                              (a, b) => a + b,
                              0
                            ) / Object.values(profile.metrics).length
                          )}
                          % avg
                        </Td>
                        <Td>
                          <HStack spacing="2">
                            <Button
                              size="sm"
                              leftIcon={<EditIcon />}
                              colorScheme="blue"
                              variant="ghost"
                              onClick={() => handleEditProfile(profile)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              leftIcon={<DeleteIcon />}
                              colorScheme="red"
                              variant="ghost"
                              isDisabled={standardProfiles.length <= 1}
                              onClick={() => handleDeleteClick(profile.id)}
                            >
                              Delete
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
              {standardProfiles.map((profile) => (
                <Card
                  key={profile.id}
                  bg={cardBg}
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <CardHeader pb="2">
                    <Heading size="md">{profile.name}</Heading>
                    <Text color="gray.500" fontSize="sm">
                      {profile.description}
                    </Text>
                  </CardHeader>
                  <CardBody pt="0">
                    <VStack align="stretch" spacing="2">
                      {Object.entries(profile.metrics).map(([key, value]) => (
                        <Box key={key}>
                          <Flex justify="space-between" align="center" mb="1">
                            <Text fontSize="sm">
                              {key
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </Text>
                            <Badge
                              colorScheme={
                                value >= 80
                                  ? "green"
                                  : value >= 60
                                  ? "blue"
                                  : "orange"
                              }
                            >
                              {value}%
                            </Badge>
                          </Flex>
                          <Progress
                            value={value}
                            size="sm"
                            colorScheme={
                              value >= 80
                                ? "green"
                                : value >= 60
                                ? "blue"
                                : "orange"
                            }
                            borderRadius="full"
                          />
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                  <CardFooter pt="0">
                    <HStack spacing="2" width="full">
                      <Button
                        size="sm"
                        leftIcon={<EditIcon />}
                        flex="1"
                        onClick={() => handleEditProfile(profile)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        leftIcon={<DeleteIcon />}
                        colorScheme="red"
                        variant="outline"
                        flex="1"
                        isDisabled={standardProfiles.length <= 1}
                        onClick={() => handleDeleteClick(profile.id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          </TabPanel>

          {/* App Settings Tab */}
          <TabPanel p="0">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
              {/* API Configuration */}
              <Card bg={cardBg} boxShadow="md">
                <CardHeader pb="2">
                  <Heading size="md" display="flex" alignItems="center">
                    <Icon as={FaGithub} mr="2" /> GitHub API Configuration
                  </Heading>
                </CardHeader>
                <CardBody>
                  <FormControl mb="4">
                    <FormLabel>GitHub API Key</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter your GitHub API key"
                      name="githubApiKey"
                      value={appSettings.githubApiKey}
                      onChange={handleSettingChange}
                    />
                    <Text fontSize="xs" color="gray.500" mt="1">
                      Required to access GitHub API with higher rate limits
                    </Text>
                  </FormControl>

                  <Divider my="4" />

                  <FormControl display="flex" alignItems="center" mb="4">
                    <FormLabel mb="0">Auto-refresh results</FormLabel>
                    <Switch
                      colorScheme="brand"
                      name="autoRefreshResults"
                      isChecked={appSettings.autoRefreshResults}
                      onChange={handleSettingChange}
                    />
                  </FormControl>

                  <FormControl mb="4">
                    <FormLabel>Default comparison profile</FormLabel>
                    <Select
                      name="defaultProfile"
                      value={appSettings.defaultProfile}
                      onChange={handleSettingChange}
                    >
                      {standardProfiles.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.name}
                        </option>
                      ))}
                    </Select>
                    <Text fontSize="xs" color="gray.500" mt="1">
                      This profile will be pre-selected when creating new
                      comparisons
                    </Text>
                  </FormControl>
                </CardBody>
                <CardFooter>
                  <Button colorScheme="brand" onClick={handleSaveSettings}>
                    Save API Settings
                  </Button>
                </CardFooter>
              </Card>

              {/* Scoring Configuration */}
              <Card bg={cardBg} boxShadow="md">
                <CardHeader pb="2">
                  <Heading size="md" display="flex" alignItems="center">
                    <Icon as={FaChartLine} mr="2" /> Scoring Configuration
                  </Heading>
                </CardHeader>
                <CardBody>
                  <FormControl mb="6">
                    <FormLabel display="flex" alignItems="center">
                      Minimum Score Threshold for "Hire" Recommendation
                      <Tooltip label="Candidates with scores below this threshold will receive a 'No Hire' recommendation">
                        <InfoOutlineIcon ml="2" color="gray.500" />
                      </Tooltip>
                    </FormLabel>
                    <Flex align="center">
                      <Slider
                        value={appSettings.scoringThreshold}
                        onChange={(val) =>
                          handleSettingSliderChange("scoringThreshold", val)
                        }
                        min={50}
                        max={90}
                        step={5}
                        flex="1"
                        colorScheme="brand"
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                          <Box color="brand.500">
                            {appSettings.scoringThreshold}
                          </Box>
                        </SliderThumb>
                      </Slider>
                      <Text
                        ml="4"
                        fontWeight="bold"
                        minW="36px"
                        textAlign="center"
                      >
                        {appSettings.scoringThreshold}%
                      </Text>
                    </Flex>
                  </FormControl>

                  <Divider my="4" />

                  <FormControl display="flex" alignItems="center" mb="4">
                    <FormLabel mb="0">
                      Save historical comparison data
                    </FormLabel>
                    <Switch
                      colorScheme="brand"
                      name="saveHistoricalData"
                      isChecked={appSettings.saveHistoricalData}
                      onChange={handleSettingChange}
                    />
                  </FormControl>

                  <FormControl
                    mb="4"
                    isDisabled={!appSettings.saveHistoricalData}
                  >
                    <FormLabel>Data retention period (days)</FormLabel>
                    <Flex align="center">
                      <Slider
                        value={appSettings.dataRetentionDays}
                        onChange={(val) =>
                          handleSettingSliderChange("dataRetentionDays", val)
                        }
                        min={7}
                        max={90}
                        step={7}
                        flex="1"
                        colorScheme="brand"
                        isDisabled={!appSettings.saveHistoricalData}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                          <Box color="brand.500">
                            {appSettings.dataRetentionDays}
                          </Box>
                        </SliderThumb>
                      </Slider>
                      <Text
                        ml="4"
                        fontWeight="bold"
                        minW="36px"
                        textAlign="center"
                      >
                        {appSettings.dataRetentionDays}
                      </Text>
                    </Flex>
                  </FormControl>

                  <FormControl display="flex" alignItems="center" mb="4">
                    <FormLabel mb="0">
                      Notify when comparison completes
                    </FormLabel>
                    <Switch
                      colorScheme="brand"
                      name="notifyOnCompletion"
                      isChecked={appSettings.notifyOnCompletion}
                      onChange={handleSettingChange}
                    />
                  </FormControl>
                </CardBody>
                <CardFooter>
                  <Button colorScheme="brand" onClick={handleSaveSettings}>
                    Save Scoring Settings
                  </Button>
                </CardFooter>
              </Card>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Profile Edit/Create Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingProfile ? "Edit Profile" : "Create New Profile"}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb="4" isRequired>
                <FormLabel>Profile Name</FormLabel>
                <Input
                  placeholder="e.g. Senior Frontend Developer"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mb="4">
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Describe the expected skills and experience level"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </FormControl>

              <Divider my="6" />

              <Heading size="sm" mb="4">
                Expected Metrics
              </Heading>

              {renderMetricSlider("Commit Frequency", "commit_frequency")}
              {renderMetricSlider("Code Quality", "code_quality")}
              {renderMetricSlider(
                "Language Proficiency",
                "language_proficiency"
              )}
              {renderMetricSlider("Project Diversity", "project_diversity")}
              {renderMetricSlider(
                "Community Engagement",
                "community_engagement"
              )}
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="brand" type="submit">
                {editingProfile ? "Save Changes" : "Create Profile"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Profile
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this profile? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteProfile} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Settings;
