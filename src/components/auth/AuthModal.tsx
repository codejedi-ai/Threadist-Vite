import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Divider,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: number;
}

export default function AuthModal({ isOpen, onClose, defaultTab = 0 }: AuthModalProps) {
  const [tabIndex, setTabIndex] = useState(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { signUp, signIn } = useAuth();
  const toast = useToast();

  const validateForm = () => {
    const newErrors: any = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (tabIndex === 1) { // Sign up
      if (!fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (tabIndex === 0) {
        // Sign In
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
          status: 'success',
          duration: 3000,
        });
      } else {
        // Sign Up
        const { error } = await signUp(email, password, {
          full_name: fullName,
        });
        if (error) throw error;
        
        toast({
          title: 'Account created!',
          description: 'Please check your email to verify your account.',
          status: 'success',
          duration: 5000,
        });
      }
      
      onClose();
      resetForm();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setErrors({});
  };

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    resetForm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign="center">
            {tabIndex === 0 ? 'Welcome back' : 'Join Threadist'}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Tabs index={tabIndex} onChange={handleTabChange} variant="soft-rounded" colorScheme="orange">
            <TabList mb={6}>
              <Tab flex={1}>Sign In</Tab>
              <Tab flex={1}>Sign Up</Tab>
            </TabList>

            <TabPanels>
              {/* Sign In Panel */}
              <TabPanel p={0}>
                <VStack spacing={4}>
                  <VStack spacing={3} w="full">
                    <Button
                      leftIcon={<FaGoogle />}
                      variant="outline"
                      w="full"
                      isDisabled
                    >
                      Continue with Google
                    </Button>
                    <Button
                      leftIcon={<FaGithub />}
                      variant="outline"
                      w="full"
                      isDisabled
                    >
                      Continue with GitHub
                    </Button>
                  </VStack>

                  <HStack w="full">
                    <Divider />
                    <Text fontSize="sm" color="gray.500" px={2}>or</Text>
                    <Divider />
                  </HStack>

                  <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing={4}>
                      <FormControl isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>

                      <Button
                        type="submit"
                        colorScheme="orange"
                        w="full"
                        isLoading={loading}
                        loadingText="Signing in..."
                      >
                        Sign In
                      </Button>
                    </VStack>
                  </form>

                  <Text fontSize="sm" textAlign="center">
                    <Link color="orange.500">Forgot your password?</Link>
                  </Text>
                </VStack>
              </TabPanel>

              {/* Sign Up Panel */}
              <TabPanel p={0}>
                <VStack spacing={4}>
                  <VStack spacing={3} w="full">
                    <Button
                      leftIcon={<FaGoogle />}
                      variant="outline"
                      w="full"
                      isDisabled
                    >
                      Continue with Google
                    </Button>
                    <Button
                      leftIcon={<FaGithub />}
                      variant="outline"
                      w="full"
                      isDisabled
                    >
                      Continue with GitHub
                    </Button>
                  </VStack>

                  <HStack w="full">
                    <Divider />
                    <Text fontSize="sm" color="gray.500" px={2}>or</Text>
                    <Divider />
                  </HStack>

                  <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing={4}>
                      <FormControl isInvalid={errors.fullName}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                        />
                        <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={errors.confirmPassword}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                        />
                        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                      </FormControl>

                      <Button
                        type="submit"
                        colorScheme="orange"
                        w="full"
                        isLoading={loading}
                        loadingText="Creating account..."
                      >
                        Create Account
                      </Button>
                    </VStack>
                  </form>

                  <Text fontSize="sm" textAlign="center" color="gray.500">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                  </Text>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}