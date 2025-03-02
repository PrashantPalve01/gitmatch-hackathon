import React, { useState } from "react";
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";

const Contact = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMsg = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Error",
        description: "Name and Email are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: `Thank you, ${formData.name}. We will get back to you soon.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    // Clear input fields after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container maxW="container.md" py="12">
      <Heading mb="6">Contact Us</Heading>
      <VStack spacing="6" align="stretch">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Message</FormLabel>
          <Textarea
            name="message"
            placeholder="How can we help you?"
            rows={6}
            value={formData.message}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="brand" alignSelf="flex-start" onClick={handleMsg}>
          Send Message
        </Button>
      </VStack>
    </Container>
  );
};

export default Contact;
