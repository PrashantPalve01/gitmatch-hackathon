import { extendTheme } from "@chakra-ui/react";

// Define the colors that will be used throughout the app
const colors = {
  brand: {
    50: "#e6f6ff",
    100: "#b3e0ff",
    200: "#80cbff",
    300: "#4db5ff",
    400: "#1a9fff",
    500: "#0081e5", // Primary brand color
    600: "#0066b8",
    700: "#004b8c",
    800: "#00315f",
    900: "#001733",
  },
  success: {
    500: "#38A169", // Green for "Hire" recommendations
  },
  warning: {
    500: "#DD6B20", // Orange for caution
  },
  danger: {
    500: "#E53E3E", // Red for "No Hire" recommendations
  },
};

// Define custom component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold",
      borderRadius: "md",
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === "dark" ? "brand.500" : "brand.500",
        color: "white",
        _hover: {
          bg: props.colorMode === "dark" ? "brand.600" : "brand.600",
        },
      }),
    },
  },
  Card: {
    baseStyle: {
      p: "6",
      borderRadius: "lg",
      boxShadow: "md",
    },
  },
};

// Define global styles
const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === "dark" ? "gray.800" : "gray.50",
      color: props.colorMode === "dark" ? "white" : "gray.800",
    },
  }),
};

// Define config options
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// Create the theme
const theme = extendTheme({
  colors,
  components,
  styles,
  config,
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
});

export default theme;
