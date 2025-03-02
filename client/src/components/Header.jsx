import React, { useContext } from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Heading,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  SettingsIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firbase/config";
import { AuthContext } from "../App";

const NavLink = ({ to, children, isActive }) => {
  const activeColor = useColorModeValue("brand.600", "brand.300");
  const hoverColor = useColorModeValue("gray.700", "gray.200");
  const color = isActive
    ? activeColor
    : useColorModeValue("gray.600", "gray.400");

  return (
    <RouterLink to={to}>
      <Button
        variant="ghost"
        color={color}
        _hover={{
          color: hoverColor,
          bg: useColorModeValue("gray.100", "gray.700"),
        }}
      >
        {children}
      </Button>
    </RouterLink>
  );
};

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const { currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn");
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Get user's initials for the avatar (if no photoURL)
  const getUserInitials = () => {
    if (!currentUser || !currentUser.displayName) return "U";

    const nameParts = currentUser.displayName.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

  return (
    <Box
      as="header"
      position="fixed"
      w="100%"
      zIndex="10"
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Container maxW="container.xl" py="3">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Heading as="h1" size="lg" color="brand.500" mr="8">
              <RouterLink to="/dashboard">
                <Flex alignItems="center">
                  <FaGithub size="24px" style={{ marginRight: "8px" }} />
                  GitHub Recruiter
                </Flex>
              </RouterLink>
            </Heading>

            <HStack spacing="4" display={{ base: "none", md: "flex" }}>
              <NavLink to="/dashboard" isActive={location.pathname === "/"}>
                Dashboard
              </NavLink>
              <NavLink
                to="/new-comparison"
                isActive={location.pathname === "/new-comparison"}
              >
                New Comparison
              </NavLink>
            </HStack>
          </Flex>

          <HStack spacing="2">
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              aria-label={`Toggle ${
                colorMode === "light" ? "Dark" : "Light"
              } Mode`}
              variant="ghost"
            />

            {/* User Profile Menu */}
            {currentUser && (
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  rounded="full"
                  cursor="pointer"
                  minW="auto"
                  rightIcon={<ChevronDownIcon />}
                >
                  <Avatar
                    size="sm"
                    name={getUserInitials()}
                    src={currentUser.photoURL || null}
                    bg="brand.500"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Flex direction="column">
                      <Text fontWeight="medium">
                        {currentUser.displayName || "User"}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {currentUser.email}
                      </Text>
                    </Flex>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as={RouterLink} to="/settings">
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}

            <Box display={{ base: "block", md: "none" }}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                  aria-label="Navigation Menu"
                />
                <MenuList>
                  <MenuItem as={RouterLink} to="/">
                    Dashboard
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/new-comparison">
                    New Comparison
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as={RouterLink} to="/settings">
                    Settings
                  </MenuItem>
                  {currentUser && (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Box>

            <Button
              as={RouterLink}
              to="/settings"
              variant="ghost"
              leftIcon={<SettingsIcon />}
              display={{ base: "none", md: "flex" }}
            >
              Settings
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
