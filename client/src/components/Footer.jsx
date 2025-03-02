import React from "react";
import { FaGithub, FaCode } from "react-icons/fa";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg={useColorModeValue("gray.800", "gray.900")} color="white" py="12">
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="8">
          <Box>
            <Heading size="md" mb="4">
              GitHub Recruiter
            </Heading>
            <Text fontSize="sm" mb="6" opacity="0.8">
              Making technical hiring objective and data-driven since 2023.
            </Text>
            <Flex>
              <Icon as={FaGithub} boxSize="6" mr="4" cursor="pointer" />
              <Icon as={FaCode} boxSize="6" cursor="pointer" />
            </Flex>
          </Box>

          <Box>
            <Heading size="sm" mb="4">
              Product
            </Heading>
            <Stack spacing="2" fontSize="sm">
              <Text cursor="pointer">Features</Text>
              <Text cursor="pointer">Pricing</Text>
              <Text cursor="pointer">Case Studies</Text>
              <Text cursor="pointer">Testimonials</Text>
            </Stack>
          </Box>

          <Box>
            <Heading size="sm" mb="4">
              Resources
            </Heading>
            <Stack spacing="2" fontSize="sm">
              <Text cursor="pointer">Documentation</Text>
              <Text cursor="pointer">API Reference</Text>
              <Text cursor="pointer">Blog</Text>
              <Text cursor="pointer">Guides</Text>
            </Stack>
          </Box>

          <Box>
            <Heading size="sm" mb="4">
              Company
            </Heading>
            <Stack spacing="2" fontSize="sm">
              <Text cursor="pointer">About Us</Text>
              <Text cursor="pointer">Careers</Text>
              <Text cursor="pointer">Contact</Text>
              <Text cursor="pointer">Privacy Policy</Text>
            </Stack>
          </Box>
        </SimpleGrid>

        {/* <Divider my="8" opacity="0.2" /> */}
      </Container>
    </Box>
  );
};

export default Footer;
