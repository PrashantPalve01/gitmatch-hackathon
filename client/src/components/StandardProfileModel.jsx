import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Stack,
  Box,
  Heading,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Text,
  Divider,
  SimpleGrid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { createStandardProfile, updateStandardProfile } from "../services/api";

const ProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    metrics: {
      commit_frequency: {
        min: 2,
        optimal: 5,
      },
      language_requirements: [{ language: "", proficiency: 50 }],
      repository_count: {
        min: 5,
      },
      stars_received: {
        min: 5,
      },
      fork_count: {
        min: 1,
      },
      code_quality_estimate: {
        min: 60,
      },
    },
    weights: {
      commit_frequency: 1,
      language_match: 1,
      repository_count: 1,
      stars_received: 1,
      fork_count: 1,
      code_quality_estimate: 1,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    } else {
      // Reset to defaults for new profile
      setFormData({
        name: "",
        description: "",
        metrics: {
          commit_frequency: {
            min: 2,
            optimal: 5,
          },
          language_requirements: [{ language: "", proficiency: 50 }],
          repository_count: {
            min: 5,
          },
          stars_received: {
            min: 5,
          },
          fork_count: {
            min: 1,
          },
          code_quality_estimate: {
            min: 60,
          },
        },
        weights: {
          commit_frequency: 1,
          language_match: 1,
          repository_count: 1,
          stars_received: 1,
          fork_count: 1,
          code_quality_estimate: 1,
        },
      });
    }
  }, [profile, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleMetricChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [section]: {
          ...prev.metrics[section],
          [field]: Number(value),
        },
      },
    }));
  };

  const handleWeightChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      weights: {
        ...prev.weights,
        [field]: Number(value),
      },
    }));
  };

  const handleLanguageChange = (index, field, value) => {
    const newLanguageRequirements = [...formData.metrics.language_requirements];
    newLanguageRequirements[index][field] =
      field === "proficiency" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        language_requirements: newLanguageRequirements,
      },
    }));
  };

  const addLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        language_requirements: [
          ...prev.metrics.language_requirements,
          { language: "", proficiency: 50 },
        ],
      },
    }));
  };

  const removeLanguage = (index) => {
    if (formData.metrics.language_requirements.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "At least one language is required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newLanguageRequirements = [...formData.metrics.language_requirements];
    newLanguageRequirements.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        language_requirements: newLanguageRequirements,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let savedProfile;

      // Validate form data
      if (!formData.name || !formData.description) {
        throw new Error("Name and description are required");
      }

      // Check if languages have names
      if (
        formData.metrics.language_requirements.some((lang) => !lang.language)
      ) {
        throw new Error("All languages must have a name");
      }

      if (profile) {
        // Update existing profile
        savedProfile = await updateStandardProfile(profile._id, formData);
        toast({
          title: "Profile updated",
          description: `Profile "${formData.name}" has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Create new profile
        savedProfile = await createStandardProfile(formData);
        toast({
          title: "Profile created",
          description: `Profile "${formData.name}" has been created.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      onSave(savedProfile);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to save profile. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            {profile ? `Edit ${profile.name}` : "Create New Profile"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={6}>
              {/* Basic Information */}
              <Box>
                <Heading size="sm" mb={4}>
                  Basic Information
                </Heading>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel htmlFor="name">Profile Name</FormLabel>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Junior Developer"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description of this profile"
                      rows={3}
                    />
                  </FormControl>
                </Stack>
              </Box>

              <Divider />

              {/* Language Requirements */}
              <Box>
                <Heading size="sm" mb={4}>
                  Language Requirements
                </Heading>
                {formData.metrics.language_requirements.map((lang, index) => (
                  <Stack
                    key={index}
                    direction={{ base: "column", md: "row" }}
                    spacing={2}
                    mb={4}
                    align="center"
                  >
                    <FormControl isRequired>
                      <FormLabel>Language</FormLabel>
                      <Input
                        value={lang.language}
                        onChange={(e) =>
                          handleLanguageChange(
                            index,
                            "language",
                            e.target.value
                          )
                        }
                        placeholder="e.g., JavaScript"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Proficiency (%)</FormLabel>
                      <Flex>
                        <NumberInput
                          value={lang.proficiency}
                          onChange={(value) =>
                            handleLanguageChange(index, "proficiency", value)
                          }
                          min={0}
                          max={100}
                          width="100px"
                          mr={2}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <IconButton
                          aria-label="Remove language"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="outline"
                          onClick={() => removeLanguage(index)}
                        />
                      </Flex>
                    </FormControl>
                  </Stack>
                ))}

                <Button
                  leftIcon={<AddIcon />}
                  onClick={addLanguage}
                  colorScheme="brand"
                  variant="outline"
                  size="sm"
                  width="full"
                >
                  Add Language
                </Button>
              </Box>

              <Divider />

              {/* Metric Requirements */}
              <Box>
                <Heading size="sm" mb={4}>
                  Metric Requirements
                </Heading>

                <Box mb={6}>
                  <Text fontWeight="medium" mb={2}>
                    Commit Frequency
                  </Text>
                  <SimpleGrid columns={2} spacing={4}>
                    <FormControl>
                      <FormLabel fontSize="sm">Minimum per week</FormLabel>
                      <NumberInput
                        value={formData.metrics.commit_frequency.min}
                        onChange={(value) =>
                          handleMetricChange("commit_frequency", "min", value)
                        }
                        min={0}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">Optimal per week</FormLabel>
                      <NumberInput
                        value={formData.metrics.commit_frequency.optimal}
                        onChange={(value) =>
                          handleMetricChange(
                            "commit_frequency",
                            "optimal",
                            value
                          )
                        }
                        min={formData.metrics.commit_frequency.min}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </SimpleGrid>
                </Box>

                <SimpleGrid columns={2} spacing={4} mb={2}>
                  <FormControl>
                    <FormLabel fontSize="sm">Repository Count (Min)</FormLabel>
                    <NumberInput
                      value={formData.metrics.repository_count.min}
                      onChange={(value) =>
                        handleMetricChange("repository_count", "min", value)
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Stars Received (Min)</FormLabel>
                    <NumberInput
                      value={formData.metrics.stars_received.min}
                      onChange={(value) =>
                        handleMetricChange("stars_received", "min", value)
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Fork Count (Min)</FormLabel>
                    <NumberInput
                      value={formData.metrics.fork_count.min}
                      onChange={(value) =>
                        handleMetricChange("fork_count", "min", value)
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Code Quality % (Min)</FormLabel>
                    <NumberInput
                      value={formData.metrics.code_quality_estimate.min}
                      onChange={(value) =>
                        handleMetricChange(
                          "code_quality_estimate",
                          "min",
                          value
                        )
                      }
                      min={0}
                      max={100}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Divider />

              {/* Weights */}
              <Box>
                <Heading size="sm" mb={4}>
                  Category Weights
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  Adjust how important each category is for the final score
                  calculation (1.0 = standard weight)
                </Text>

                <Stack spacing={4}>
                  {Object.entries(formData.weights).map(([key, value]) => (
                    <FormControl key={key}>
                      <FormLabel htmlFor={`weight-${key}`}>
                        {key
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </FormLabel>
                      <Flex>
                        <Slider
                          id={`weight-${key}`}
                          min={0}
                          max={2}
                          step={0.1}
                          value={value}
                          onChange={(val) => handleWeightChange(key, val)}
                          flex="1"
                          mr={4}
                          colorScheme="brand"
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                        <NumberInput
                          value={value}
                          onChange={(val) => handleWeightChange(key, val)}
                          step={0.1}
                          min={0}
                          max={2}
                          maxW="80px"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                    </FormControl>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="brand" isLoading={isSubmitting}>
              {profile ? "Update Profile" : "Create Profile"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
