// SignupPage.jsx
import React, { useState } from "react";
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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, show success or error
      if (email.includes("@") && password.length >= 6) {
        alert("Signup successful! Redirecting to dashboard...");
        window.location.href = "/";
      } else {
        setError("Please use a valid email and password (6+ characters)");
      }
    }, 1500);
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
          {error && (
            <Alert status="error" mb="6" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Stack spacing="6">
            <Button
              variant="outline"
              leftIcon={<FaGithub />}
              w="full"
              onClick={() => alert("GitHub OAuth would be implemented here")}
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
                    <Checkbox defaultChecked>
                      I agree to the Terms and Privacy Policy
                    </Checkbox>
                  </Stack>
                  <Button
                    type="submit"
                    colorScheme="brand"
                    isLoading={isLoading}
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
    </Container>
  );
};

export default SignupPage;
