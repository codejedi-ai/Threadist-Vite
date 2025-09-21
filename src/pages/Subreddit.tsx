import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Avatar,
  Flex,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useStories } from '../hooks/useStories';
import StoryCard from '../components/StoryCard';
import Sidebar from '../components/Sidebar';
import { FaPlus, FaBell, FaVolumeUp, FaSpinner } from 'react-icons/fa';

export default function Subreddit() {
  const { subreddit } = useParams();
  const { stories, loading, error, refetch } = useStories({
    subreddit: subreddit || '',
    sort: 'hot',
    limit: 20,
  });
  
  const bg = useColorModeValue('#dae0e6', '#0b1426');
  const headerBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');

  // Mock subreddit data
  const subredditData = {
    name: subreddit || 'nosleep',
    description: 'A place to share your original scary stories and experiences.',
    members: '15.2M',
    online: '12.4K',
    created: 'Created Jan 25, 2010',
    icon: '👻'
  };

  return (
    <Box bg={bg} minH="100vh" pt="60px">
      {/* Subreddit Header */}
      <Box
        bg={headerBg}
        borderBottom="1px solid"
        borderColor={borderColor}
        mb={6}
      >
        <Container maxW="1200px" py={6}>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Avatar size="lg" name={subredditData.name} bg="orange.500">
                {subredditData.icon}
              </Avatar>
              <VStack align="flex-start" spacing={1} flex={1}>
                <HStack spacing={2}>
                  <Text fontSize="2xl" fontWeight="bold">
                    r/{subredditData.name}
                  </Text>
                  <Badge colorScheme="orange" variant="subtle">
                    <HStack spacing={1}>
                      <FaVolumeUp size={10} />
                      <Text fontSize="xs">AI Narration Available</Text>
                    </HStack>
                  </Badge>
                </HStack>
                <Text color="gray.500">{subredditData.description}</Text>
                <HStack spacing={4} fontSize="sm" color="gray.500">
                  <Text>{subredditData.members} members</Text>
                  <Text>•</Text>
                  <Text>{subredditData.online} online</Text>
                  <Text>•</Text>
                  <Text>{subredditData.created}</Text>
                </HStack>
              </VStack>
              <VStack spacing={2}>
                <Button colorScheme="orange" leftIcon={<FaPlus />}>
                  Join
                </Button>
                <Button variant="outline" leftIcon={<FaBell />} size="sm">
                  Notify
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="1200px">
        <Flex gap={6}>
          {/* Main Content */}
          <Box flex={1}>
            {loading ? (
              <VStack spacing={4} py={8}>
                <Spinner size="lg" color="orange.500" />
                <Text color="gray.500">Loading stories...</Text>
              </VStack>
            ) : error ? (
              <Alert status="error">
                <AlertIcon />
                <VStack align="flex-start" spacing={2}>
                  <Text>{error}</Text>
                  <Button size="sm" onClick={refetch}>
                    Try Again
                  </Button>
                </VStack>
              </Alert>
            ) : stories.length === 0 ? (
              <VStack spacing={4} py={8}>
                <Text color="gray.500">No stories found in r/{subreddit}</Text>
                <Button onClick={refetch}>Refresh</Button>
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch">
                {stories.map((story) => (
                  <StoryCard 
                    key={story.id} 
                    story={{
                      ...story,
                      createdAt: new Date(story.created_at),
                      isNarrated: story.is_narrated,
                      audioUrl: story.audio_url,
                    }} 
                  />
                ))}
              </VStack>
            )}
          </Box>

          {/* Sidebar */}
          <Box w="300px" display={{ base: 'none', lg: 'block' }}>
            <Sidebar />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}