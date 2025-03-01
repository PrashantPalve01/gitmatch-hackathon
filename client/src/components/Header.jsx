import React from "react";
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
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";

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
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
              <RouterLink to="/">
                <Flex alignItems="center">
                  <FaGithub size="24px" style={{ marginRight: "8px" }} />
                  GitHub Recruiter
                </Flex>
              </RouterLink>
            </Heading>

            <HStack spacing="4" display={{ base: "none", md: "flex" }}>
              <NavLink to="/" isActive={location.pathname === "/"}>
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
