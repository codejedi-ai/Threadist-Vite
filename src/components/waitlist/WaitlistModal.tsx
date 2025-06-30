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
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Badge,
  Box,
} from '@chakra-ui/react';
import { FaVolumeUp, FaUsers } from 'react-icons/fa';
import { supabase } from '../../lib/supabase';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const interests = [
  'Horror Stories (r/nosleep)',
  'Funny Stories (r/tifu)',
  'Writing Prompts',
  'Relationship Advice',
  'True Crime',
  'Paranormal',
  'Comedy',
  'Drama',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Real Life Stories'
];

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const toast = useToast();

  const validateForm = () => {
    const newErrors: any = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email,
            name,
            interests: selectedInterests,
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('This email is already on the waitlist!');
        }
        throw error;
      }

      setSubmitted(true);
      toast({
        title: 'Welcome to the waitlist!',
        description: 'We\'ll notify you when Threadist launches.',
        status: 'success',
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to join waitlist',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setSelectedInterests([]);
    setErrors({});
    setSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            <VStack spacing={2}>
              <Text fontSize="2xl">🎉</Text>
              <Text>You're on the list!</Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} textAlign="center">
              <Text color="gray.600">
                Thanks for joining the Threadist waitlist! We'll send you an email when we launch.
              </Text>
              <Box
                bg="orange.50"
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="orange.200"
                w="full"
              >
                <VStack spacing={2}>
                  <HStack spacing={2}>
                    <FaUsers color="#dd6b20" />
                    <Text fontWeight="bold" color="orange.600">
                      Early Access Benefits
                    </Text>
                  </HStack>
                  <VStack spacing={1} fontSize="sm" color="orange.600">
                    <Text>• First access to AI narration features</Text>
                    <Text>• Premium voices included free for 30 days</Text>
                    <Text>• Exclusive beta features</Text>
                  </VStack>
                </VStack>
              </Box>
              <Button colorScheme="orange" onClick={handleClose}>
                Close
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack spacing={2} textAlign="center">
            <HStack spacing={2}>
              <FaVolumeUp color="#dd6b20" />
              <Text>Join the Threadist Waitlist</Text>
            </HStack>
            <Text fontSize="sm" fontWeight="normal" color="gray.500">
              Be the first to experience AI-narrated Reddit stories
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <VStack spacing={4} w="full">
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              </VStack>

              <VStack spacing={3} w="full" align="flex-start">
                <FormLabel mb={0}>What types of stories interest you? (Optional)</FormLabel>
                <CheckboxGroup
                  value={selectedInterests}
                  onChange={(values) => setSelectedInterests(values as string[])}
                >
                  <SimpleGrid columns={2} spacing={2} w="full">
                    {interests.map((interest) => (
                      <Checkbox key={interest} value={interest} size="sm">
                        <Text fontSize="sm">{interest}</Text>
                      </Checkbox>
                    ))}
                  </SimpleGrid>
                </CheckboxGroup>
              </VStack>

              <Box
                bg="blue.50"
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="blue.200"
                w="full"
              >
                <VStack spacing={2}>
                  <HStack spacing={2}>
                    <Text fontWeight="bold" color="blue.600" fontSize="sm">
                      🚀 Coming Soon Features
                    </Text>
                  </HStack>
                  <VStack spacing={1} fontSize="xs" color="blue.600">
                    <Text>• High-quality AI voices with emotion</Text>
                    <Text>• Personalized story recommendations</Text>
                    <Text>• Offline listening capabilities</Text>
                    <Text>• Community features and discussions</Text>
                  </VStack>
                </VStack>
              </Box>

              <Button
                type="submit"
                colorScheme="orange"
                w="full"
                size="lg"
                isLoading={loading}
                loadingText="Joining waitlist..."
              >
                Join Waitlist
              </Button>

              <Text fontSize="xs" textAlign="center" color="gray.500">
                We'll only email you about Threadist updates. No spam, ever.
              </Text>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}