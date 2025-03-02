import React, { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firbase/config";

// Import custom theme
import theme from "./ChakraTheme";

// Import components
import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import Dashboard from "./pages/Dashboard";
import NewComparison from "./pages/NewComparison";
import ResultsPage from "./pages/ResultsPage";
import Settings from "./pages/Settings";

// Import pages from your documents
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Import or create additional public pages
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Create auth context
export const AuthContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      // Update localStorage based on auth state
      if (user) {
        localStorage.setItem("isLoggedIn", "true");
      } else {
        localStorage.removeItem("isLoggedIn");
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Protected route component using context
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <Box p={10}>Loading...</Box>;
    }

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  if (loading) {
    return <Box p={10}>Loading...</Box>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      <ChakraProvider theme={theme}>
        <Router>
          <Box minH="100vh">
            <Routes>
              {/* Public routes with PublicLayout */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Protected routes with authenticated Layout */}
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new-comparison" element={<NewComparison />} />
                <Route path="/results/:id" element={<ResultsPage />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </Box>
        </Router>
      </ChakraProvider>
    </AuthContext.Provider>
  );
}

export default App;
