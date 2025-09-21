import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { FaVolumeUp, FaBookmark, FaHistory } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import AuthProfile from '../components/auth/Profile';

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const bg = useColorModeValue('#dae0e6', '#0b1426');
  const cardBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');

  if (isLoading) {
    return (
      <Box bg={bg} minH="100vh" pt="60px">
        <Container maxW="1000px" py={6}>
          <VStack spacing={6} align="center">
            <Spinner size="lg" color="orange.500" />
            <Text color="gray.500">Loading profile...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box bg={bg} minH="100vh" pt="60px">
        <Container maxW="1000px" py={6}>
          <VStack spacing={6} align="center">
            <Text fontSize="xl" color="gray.500">
              Please log in to view your profile
            </Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bg} minH="100vh" pt="60px">
      <Container maxW="1000px" py={6}>
        <VStack spacing={6} align="stretch">
          {/* Profile Header */}
          <AuthProfile />

          {/* Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Box
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                127
              </Text>
              <Text fontSize="sm" color="gray.500">
                Stories Listened
              </Text>
            </Box>
            <Box
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                45h
              </Text>
              <Text fontSize="sm" color="gray.500">
                Total Listen Time
              </Text>
            </Box>
            <Box
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                23
              </Text>
              <Text fontSize="sm" color="gray.500">
                Saved Stories
              </Text>
            </Box>
            <Box
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                8
              </Text>
              <Text fontSize="sm" color="gray.500">
                Subreddits Followed
              </Text>
            </Box>
          </SimpleGrid>

          {/* Content Tabs */}
          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            p={6}
          >
            <Tabs colorScheme="orange">
              <TabList>
                <Tab>
                  <HStack spacing={2}>
                    <FaHistory />
                    <Text>Listening History</Text>
                  </HStack>
                </Tab>
                <Tab>
                  <HStack spacing={2}>
                    <FaBookmark />
                    <Text>Saved Stories</Text>
                  </HStack>
                </Tab>
                <Tab>
                  <HStack spacing={2}>
                    <FaVolumeUp />
                    <Text>Audio Preferences</Text>
                  </HStack>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Text color="gray.500" textAlign="center" py={8}>
                      Your listening history will appear here
                    </Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Text color="gray.500" textAlign="center" py={8}>
                      Your saved stories will appear here
                    </Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Text fontWeight="bold" mb={4}>
                      Voice Settings
                    </Text>
                    <HStack justify="space-between">
                      <Text>Preferred Voice</Text>
                      <Button size="sm" variant="outline">
                        Select Voice
                      </Button>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Reading Speed</Text>
                      <Button size="sm" variant="outline">
                        Normal
                      </Button>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Auto-play Next Story</Text>
                      <Button size="sm" colorScheme="orange">
                        Enabled
                      </Button>
                    </HStack>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}