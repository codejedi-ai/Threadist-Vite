import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Flex, // Import Flex
} from '@chakra-ui/react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Replace this with your actual authentication logic
    try {
      // const response = await api.signIn(email, password);
      // if (response.success) {
      //   // Redirect or update state upon successful sign-in
      // } else {
      //   setError(response.message || 'Sign-in failed.');
      // }
      console.log('Signing in with:', email, password);
      setError('Not implemented');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Flex // Use Flex to center the content
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // Ensure it takes up the full viewport height
    >
      <Box
        width="100%"
        maxWidth="md"
        mx="auto"
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Sign In
        </Heading>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button colorScheme="blue" width="100%" type="submit">
            Sign In
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default SignIn;