import React from "react";
import { Box, Flex, Container, useColorModeValue } from "@chakra-ui/react";
import Header from "./Header";

const Layout = ({ children }) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box minH="100vh" bg={bgColor}>
      <Header />
      <Container maxW="container.xl" pt="20" pb="10">
        <Flex direction="column" flex="1">
          <Box as="main" flex="1" py="6">
            {children}
          </Box>
          <Box
            as="footer"
            py="6"
            textAlign="center"
            fontSize="sm"
            color="gray.500"
          >
            © {new Date().getFullYear()} GitHub Recruiter. All rights reserved.
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Layout;
