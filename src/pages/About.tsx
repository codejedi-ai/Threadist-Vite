import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
const About = () => {
    return (
      <Box
        maxW="800px"
        mx="auto"
        mt="4rem"
        p="2rem"
        bg="gray.50"
        borderRadius="lg"
        shadow="md"
        textAlign="center"
      >
        <Heading as="h1" size="xl" color="teal.500" mb="4">
          About Us
        </Heading>
        <Text fontSize="lg" color="gray.700" mb="6">
          Welcome to the About page! We are passionate about building amazing web experiences that engage and inspire users. Our focus is on delivering top-notch solutions tailored to your needs.
        </Text>
        <Button
          colorScheme="teal"
          variant="solid"
          size="lg"
          onClick={() => alert("Thanks for visiting!")}
        >
          Learn More
        </Button>
      </Box>
    );
  };
  
export default About;