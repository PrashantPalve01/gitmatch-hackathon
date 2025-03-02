import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import custom theme
import theme from "./ChakraTheme";

// Import components
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NewComparison from "./pages/NewComparison";
import ResultsPage from "./pages/ResultsPage";
import Settings from "./pages/Settings";
// Import pages
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/new-comparison" element={<NewComparison />} />
              <Route path="/results/:id" element={<ResultsPage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
