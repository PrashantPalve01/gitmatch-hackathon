// src/pages/SignupPage.jsx
import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Link,
  useColorModeValue,
  useToast,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firbase/config";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    companyName: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const cancelRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const showError = (message) => {
    // Use toast for quick notifications
    if (message.length < 60) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      // Use AlertDialog for longer messages that need more attention
      setErrorMessage(message);
      setErrorDialogOpen(true);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      showError("You must agree to the Terms and Privacy Policy");
      return;
    }

    const { email, password, firstName, lastName, companyName, role } =
      formData;

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      showError("Please fill in all required fields");
      return;
    }

    if (password.length < 6) {
      showError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        companyName: companyName || "",
        role: role || "",
        createdAt: new Date(),
      });

      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      // Set a flag for authenticated user
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);

      // Format Firebase error messages to be more user-friendly
      let friendlyError = error.message;
      if (error.code === "auth/email-already-in-use") {
        friendlyError =
          "This email is already associated with an account. Please log in or use a different email.";
      } else if (error.code === "auth/invalid-email") {
        friendlyError = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        friendlyError =
          "Please choose a stronger password (at least 6 characters).";
      }

      showError(friendlyError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setIsLoading(true);

    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Get user info from GitHub
      const user = result.user;
      const userName = user.displayName
        ? user.displayName.split(" ")
        : ["", ""];

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: userName[0] || "",
        lastName: userName[1] || "",
        email: user.email || "",
        githubConnected: true,
        createdAt: new Date(),
      });

      toast({
        title: "GitHub Connected",
        description: "Your GitHub account has been connected successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      // Set a flag for authenticated user
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error with GitHub signup:", error);

      // Format GitHub auth errors
      let friendlyError = error.message;
      if (error.code === "auth/account-exists-with-different-credential") {
        friendlyError =
          "An account already exists with the same email address but different sign-in credentials. Try signing in using email and password.";
      } else if (error.code === "auth/popup-closed-by-user") {
        friendlyError = "The sign-in process was cancelled. Please try again.";
      }

      showError(friendlyError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6" textAlign="center">
          <Heading size="xl">Create your account</Heading>
          <Text color="gray.500">
            Start making data-driven hiring decisions today
          </Text>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Button
              variant="outline"
              leftIcon={<FaGithub />}
              w="full"
              onClick={handleGithubSignup}
              isLoading={isLoading && formData.email === ""}
            >
              Continue with GitHub
            </Button>

            <HStack>
              <Divider />
              <Text fontSize="sm" color="gray.500">
                OR
              </Text>
              <Divider />
            </HStack>

            <form onSubmit={handleSignup}>
              <Stack spacing="5">
                <HStack>
                  <FormControl isRequired>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </FormControl>
                </HStack>

                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="companyName">Company Name</FormLabel>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="role">Your Role</FormLabel>
                  <Select
                    id="role"
                    placeholder="Select your role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="recruiter">Recruiter</option>
                    <option value="hiring_manager">Hiring Manager</option>
                    <option value="tech_lead">Tech Lead</option>
                    <option value="hr">HR Professional</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>

                <Stack spacing="6">
                  <Stack direction="row">
                    <Checkbox
                      isChecked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    >
                      I agree to the Terms and Privacy Policy
                    </Checkbox>
                  </Stack>
                  <Button
                    type="submit"
                    colorScheme="brand"
                    isLoading={isLoading && formData.email !== ""}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Text textAlign="center">
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" color="brand.500">
            Sign in
          </Link>
        </Text>
      </Stack>

      {/* Error Dialog for detailed error messages */}
      <AlertDialog
        isOpen={errorDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setErrorDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Error
            </AlertDialogHeader>

            <AlertDialogBody>{errorMessage}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setErrorDialogOpen(false)}
                colorScheme="brand"
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default SignupPage;
