import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Badge,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";

const PricingCard = ({
  name,
  price,
  description,
  features,
  isPopular,
  buttonText = "Get Started",
}) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const popularBorderColor = "brand.400";

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="lg"
      borderWidth="2px"
      borderColor={isPopular ? popularBorderColor : borderColor}
      boxShadow={isPopular ? "lg" : "md"}
      position="relative"
      transform={isPopular ? { lg: "scale(1.05)" } : "none"}
      zIndex={isPopular ? 1 : 0}
    >
      {isPopular && (
        <Badge
          colorScheme="brand"
          position="absolute"
          top="-4"
          right="50%"
          transform="translateX(50%)"
          px={3}
          py={1}
          rounded="full"
          fontSize="sm"
          fontWeight="bold"
        >
          Most Popular
        </Badge>
      )}

      <VStack spacing={5} align="stretch">
        <Box>
          <Heading size="md" mb={2}>
            {name}
          </Heading>
          <Flex align="baseline">
            <Heading size="2xl">${price}</Heading>
            <Text fontSize="md" color="gray.500" ml={2}>
              /month
            </Text>
          </Flex>
          <Text mt={2} color="gray.500" fontSize="sm">
            {description}
          </Text>
        </Box>

        <Divider />

        <List spacing={3}>
          {features.map((feature, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <ListIcon
                as={feature.included ? CheckIcon : CloseIcon}
                color={feature.included ? "green.500" : "red.500"}
                mr={2}
              />
              <Text
                fontSize="sm"
                color={feature.included ? "inherit" : "gray.500"}
                fontWeight={feature.highlight ? "medium" : "normal"}
              >
                {feature.text}
                {feature.isNew && (
                  <Badge
                    ml={2}
                    colorScheme="green"
                    variant="outline"
                    fontSize="xs"
                  >
                    New
                  </Badge>
                )}
              </Text>
            </ListItem>
          ))}
        </List>

        <Button
          mt={4}
          colorScheme={isPopular ? "brand" : "gray"}
          variant={isPopular ? "solid" : "outline"}
          size="lg"
          w="full"
        >
          {buttonText}
        </Button>
      </VStack>
    </Box>
  );
};

const Pricing = () => {
  const headingColor = useColorModeValue("gray.700", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const sectionBg = useColorModeValue("gray.50", "gray.800");

  const pricingPlans = [
    {
      name: "Starter",
      price: "49",
      description: "Perfect for small teams or individual tech recruiters",
      features: [
        { text: "10 candidate comparisons per month", included: true },
        { text: "GitHub profile analysis", included: true },
        { text: "Basic metrics visualization", included: true },
        { text: "3 standard profile templates", included: true },
        { text: "Email support", included: true },
        { text: "Custom standard profiles", included: false },
        { text: "Team collaboration features", included: false },
        { text: "API access", included: false },
        { text: "Advanced analytics", included: false },
      ],
      isPopular: false,
    },
    {
      name: "Professional",
      price: "99",
      description: "Ideal for growing recruitment teams",
      features: [
        {
          text: "30 candidate comparisons per month",
          included: true,
          highlight: true,
        },
        { text: "GitHub profile analysis", included: true },
        {
          text: "Advanced metrics visualization",
          included: true,
          highlight: true,
        },
        {
          text: "10 standard profile templates",
          included: true,
          highlight: true,
        },
        { text: "Priority email support", included: true },
        {
          text: "Custom standard profiles",
          included: true,
          highlight: true,
          isNew: true,
        },
        {
          text: "Team collaboration features",
          included: true,
          highlight: true,
        },
        { text: "API access", included: false },
        { text: "Advanced analytics", included: false },
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "249",
      description: "For large teams with advanced needs",
      features: [
        {
          text: "Unlimited candidate comparisons",
          included: true,
          highlight: true,
        },
        { text: "GitHub profile analysis", included: true },
        { text: "Advanced metrics visualization", included: true },
        {
          text: "Unlimited standard profile templates",
          included: true,
          highlight: true,
        },
        { text: "24/7 priority support", included: true, highlight: true },
        { text: "Custom standard profiles", included: true },
        {
          text: "Advanced team collaboration",
          included: true,
          highlight: true,
        },
        { text: "API access", included: true, highlight: true, isNew: true },
        {
          text: "Advanced analytics dashboard",
          included: true,
          highlight: true,
          isNew: true,
        },
      ],
      isPopular: false,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="brand.500" color="white" py={16}>
        <Container maxW="container.xl" textAlign="center">
          <Heading size="2xl" mb={4}>
            Simple, Transparent Pricing
          </Heading>
          <Text fontSize="xl" maxW="container.md" mx="auto">
            Choose the plan that's right for your recruitment needs. All plans
            include our core GitHub analysis features.
          </Text>
        </Container>
      </Box>

      {/* Pricing Cards */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={{ base: 10, lg: 4 }}
          mt={{ lg: 12 }}
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </SimpleGrid>

        <Text textAlign="center" mt={12} color={textColor} fontSize="sm">
          All plans include a 14-day free trial. No credit card required.
        </Text>
      </Container>

      {/* FAQ Section */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="container.xl">
          <Heading size="xl" mb={12} textAlign="center" color={headingColor}>
            Frequently Asked Questions
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <VStack align="start" spacing={4}>
              <Box>
                <Heading size="md" mb={2} color={headingColor}>
                  How are candidate comparisons counted?
                </Heading>
                <Text color={textColor}>
                  Each time you analyze a new GitHub profile and compare it
                  against a standard profile, it counts as one comparison.
                  Viewing previous comparisons doesn't count against your
                  monthly limit.
                </Text>
              </Box>

              <Box>
                <Heading size="md" mb={2} color={headingColor}>
                  Can I upgrade or downgrade my plan?
                </Heading>
                <Text color={textColor}>
                  Yes, you can change your plan at any time. Changes take effect
                  at the start of your next billing cycle, and any adjustments
                  to pricing will be prorated accordingly.
                </Text>
              </Box>

              <Box>
                <Heading size="md" mb={2} color={headingColor}>
                  Do you offer custom enterprise solutions?
                </Heading>
                <Text color={textColor}>
                  Yes, for larger organizations with specific requirements, we
                  offer custom enterprise solutions with dedicated support,
                  integration with your ATS, and custom metrics. Contact us for
                  details.
                </Text>
              </Box>
            </VStack>

            <VStack align="start" spacing={4}>
              <Box>
                <Heading size="md" mb={2} color={headingColor}>
                  What happens if I reach my monthly limit?
                </Heading>
                <Text color={textColor}>
                  You'll still have access to all previous comparisons and data.
                  For additional comparisons, you can either upgrade your plan
                  or wait until your limit resets at the start of your billing
                  cycle.
                </Text>
              </Box>

              <Box>
                <Heading size="md" mb={2} color={headingColor}>
                  Is there a discount for annual billing?
                </Heading>
                <Text color={textColor}>
                  Yes, we offer a 20% discount when you choose annual billing.
                  This option is available during signup or can be changed in
                  your account settings.
                </Text>
              </Box>

              <Box>
                <Heading size="md" mb={2} color={headingColor}>
                  How does the 14-day trial work?
                </Heading>
                <Text color={textColor}>
                  Your trial includes all features of the Professional plan.
                  After 14 days, you can select any plan that fits your needs or
                  cancel without being charged.
                </Text>
              </Box>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Pricing;
