// src/pages/LoginPage.jsx
import React, { useState, useRef, useEffect } from "react";
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
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firbase/config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const cancelRef = useRef();

  useEffect(() => {
    // Check for remembered email on component mount
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Set persistence based on "remember me" option
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Set a flag for authenticated user
      localStorage.setItem("isLoggedIn", "true");

      toast({
        title: "Welcome GitHub Recruiter Application!",
        description: "You've been successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);

      // Format Firebase error messages
      let friendlyError = "Invalid email or password. Please try again.";
      if (error.code === "auth/user-not-found") {
        friendlyError =
          "No account found with this email. Please check the email or sign up.";
      } else if (error.code === "auth/wrong-password") {
        friendlyError =
          "Incorrect password. Please try again or reset your password.";
      } else if (error.code === "auth/too-many-requests") {
        friendlyError =
          "Access to this account has been temporarily disabled due to many failed login attempts. Reset your password or try again later.";
      }
      showError(friendlyError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);

    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);

      // Set a flag for authenticated user
      localStorage.setItem("isLoggedIn", "true");

      toast({
        title: "Success!",
        description: "You've been successfully logged in with GitHub.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error with GitHub login:", error);

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

  const handleForgotPassword = async () => {
    if (!email) {
      showError("Please enter your email address to reset your password");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setIsResetEmailSent(true);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for instructions to reset your password",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error sending password reset:", error);

      // Format reset password errors
      let friendlyError = error.message;
      if (error.code === "auth/user-not-found") {
        friendlyError = "No account found with this email address.";
      } else if (error.code === "auth/invalid-email") {
        friendlyError = "Please enter a valid email address.";
      }

      showError(friendlyError);
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
          <Heading size="xl">Sign in to your account</Heading>
          <Text color="gray.500">Welcome back to GitHub Recruiter</Text>
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
              onClick={handleGithubLogin}
              isLoading={isLoading && !email}
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

            <form onSubmit={handleLogin}>
              <Stack spacing="5">
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Stack spacing="6">
                  <Stack direction="row" justifyContent="space-between">
                    <Checkbox
                      isChecked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    >
                      Remember me
                    </Checkbox>
                    <Link
                      color="brand.500"
                      fontSize="sm"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </Link>
                  </Stack>
                  {isResetEmailSent && (
                    <Text color="green.500" fontSize="sm">
                      Password reset email sent! Check your inbox.
                    </Text>
                  )}
                  <Button
                    type="submit"
                    colorScheme="brand"
                    isLoading={isLoading && email}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Text textAlign="center">
          Don't have an account?{" "}
          <Link as={RouterLink} to="/signup" color="brand.500">
            Sign up
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

export default LoginPage;
