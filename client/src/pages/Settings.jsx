import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Tag,
  TagLabel,
  Flex,
  Stack,
  Progress,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Spinner,
  Center,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { getStandardProfiles, deleteStandardProfile } from "../services/api";
import ProfileModal from "../components/StandardProfileModel";

const SettingsPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const profilesData = await getStandardProfiles();
      setProfiles(profilesData);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      setError("Failed to load profiles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    onEditOpen();
  };

  const handleDeleteConfirm = (profile) => {
    setSelectedProfile(profile);
    onDeleteOpen();
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteStandardProfile(selectedProfile._id);
      setProfiles(profiles.filter((p) => p._id !== selectedProfile._id));
      toast({
        title: "Profile deleted",
        description: `Profile "${selectedProfile.name}" has been deleted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onDeleteClose();
    } catch (err) {
      console.error("Error deleting profile:", err);
      toast({
        title: "Error",
        description: "Failed to delete profile. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCreateProfile = () => {
    setSelectedProfile(null);
    onEditOpen();
  };

  const handleProfileSaved = (updatedProfile) => {
    // Update the profiles list after editing or creating
    if (selectedProfile) {
      // Editing existing profile
      setProfiles(
        profiles.map((p) => (p._id === updatedProfile._id ? updatedProfile : p))
      );
    } else {
      // Adding new profile
      setProfiles([...profiles, updatedProfile]);
    }
    onEditClose();
  };

  if (isLoading) {
    return (
      <Center h="70vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text>Loading your profiles...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="70vh">
        <VStack spacing={4}>
          <Text color="red.500">{error}</Text>
          <Button onClick={fetchProfiles} colorScheme="brand">
            Try Again
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="8">
        <Box>
          <Heading size="xl" mb="2">
            Standard Profiles
          </Heading>
          <Text color="gray.500">
            Manage your standard profiles for candidate comparisons
          </Text>
        </Box>
        <Button
          onClick={handleCreateProfile}
          colorScheme="brand"
          leftIcon={<AddIcon />}
          size="lg"
        >
          New Profile
        </Button>
      </Flex>

      {profiles.length === 0 ? (
        <Center h="50vh">
          <VStack spacing={4}>
            <Text>
              No standard profiles found. Create your first profile to get
              started.
            </Text>
            <Button
              onClick={handleCreateProfile}
              colorScheme="brand"
              leftIcon={<AddIcon />}
            >
              Create Profile
            </Button>
          </VStack>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
          {profiles.map((profile) => (
            <Card key={profile._id} boxShadow="md">
              <CardHeader>
                <Heading size="md">{profile.name}</Heading>
                <Text color="gray.500" fontSize="sm" mt="1">
                  {profile.description}
                </Text>
              </CardHeader>
              <CardBody>
                <Stack spacing="4">
                  <Box>
                    <Text fontWeight="bold" mb="2">
                      Language Requirements
                    </Text>
                    <Flex flexWrap="wrap" gap="2">
                      {profile.metrics.language_requirements.map(
                        (lang, idx) => (
                          <Tag
                            key={idx}
                            colorScheme="brand"
                            size="md"
                            borderRadius="full"
                          >
                            <TagLabel>
                              {lang.language}: {lang.proficiency}%
                            </TagLabel>
                          </Tag>
                        )
                      )}
                    </Flex>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" mb="2">
                      Commit Frequency
                    </Text>
                    <Flex justify="space-between" mb="1">
                      <Text fontSize="sm">
                        Min: {profile.metrics.commit_frequency.min} per week
                      </Text>
                      <Text fontSize="sm">
                        Optimal: {profile.metrics.commit_frequency.optimal} per
                        week
                      </Text>
                    </Flex>
                    <Progress
                      value={
                        (profile.metrics.commit_frequency.min /
                          profile.metrics.commit_frequency.optimal) *
                        100
                      }
                      colorScheme="brand"
                      borderRadius="md"
                      size="sm"
                    />
                  </Box>

                  <SimpleGrid columns={2} spacing={3}>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Repositories
                      </Text>
                      <Text>Min: {profile.metrics.repository_count.min}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Stars
                      </Text>
                      <Text>Min: {profile.metrics.stars_received.min}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Forks
                      </Text>
                      <Text>Min: {profile.metrics.fork_count.min}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Code Quality
                      </Text>
                      <Text>
                        Min: {profile.metrics.code_quality_estimate.min}%
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Flex width="100%" justify="space-between">
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="brand"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProfile(profile)}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteConfirm(profile)}
                  >
                    Delete
                  </Button>
                </Flex>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* Edit/Create Profile Modal */}
      <ProfileModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        profile={selectedProfile}
        onSave={handleProfileSaved}
      />

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
              Are you sure you want to delete the profile "
              {selectedProfile?.name}"? This action cannot be undone.
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

export default SettingsPage;
