import React from "react";
import {
  Box,
  Flex,
  Container,
  Button,
  HStack,
  Image,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const PublicLayout = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box>
      {/* Public Navigation Header */}
      <Box
        as="header"
        position="fixed"
        w="full"
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        zIndex="1000"
      >
        <Container maxW="container.xl">
          <Flex py="4" justify="space-between" align="center">
            {/* Logo */}
            <RouterLink to="/">
              <HStack spacing="3">
                <FaGithub size="24px" style={{ marginRight: "8px" }} />
                <Box fontWeight="bold" fontSize="lg">
                  GitHub Recruiter
                </Box>
              </HStack>
            </RouterLink>

            {/* Navigation Links */}
            <HStack spacing="8" display={{ base: "none", md: "flex" }}>
              <Link as={RouterLink} to="/features" fontWeight="medium">
                Features
              </Link>
              <Link as={RouterLink} to="/pricing" fontWeight="medium">
                Pricing
              </Link>
              <Link as={RouterLink} to="/about" fontWeight="medium">
                About
              </Link>
              <Link as={RouterLink} to="/contact" fontWeight="medium">
                Contact
              </Link>
            </HStack>

            {/* Auth Buttons */}
            <HStack spacing="4">
              <Button as={RouterLink} to="/login" variant="ghost">
                Log In
              </Button>
              <Button
                as={RouterLink}
                to="/signup"
                colorScheme="brand"
                leftIcon={<FaGithub />}
              >
                Sign Up
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Page Content */}
      <Box pt={{ base: "16", md: "20" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PublicLayout;
