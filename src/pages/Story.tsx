import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Divider,
  Avatar,
  Badge,
  IconButton,
  Textarea,
  Spinner,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useStory } from '../hooks/useStory';
import { FaPlay, FaPause, FaVolumeUp, FaShare, FaBookmark } from 'react-icons/fa';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { formatDistanceToNow } from 'date-fns';

export default function Story() {
  const { subreddit, postId } = useParams();
  const { story, loading, error } = useStory(postId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [comment, setComment] = useState('');

  const bg = useColorModeValue('#dae0e6', '#0b1426');
  const cardBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const handleVote = (voteType: 'up' | 'down') => {
    setUserVote(userVote === voteType ? null : voteType);
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // Audio playback logic would go here
  };

  if (loading) {
    return (
      <Box bg={bg} minH="100vh" pt="60px">
        <Container maxW="800px" py={6}>
          <VStack spacing={6} align="center">
            <Spinner size="lg" color="orange.500" />
            <Text color="gray.500">Loading story...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (error || !story) {
    return (
      <Box bg={bg} minH="100vh" pt="60px">
        <Container maxW="800px" py={6}>
          <VStack spacing={6} align="center">
            <Text fontSize="xl" color="red.500">
              {error || 'Story not found'}
            </Text>
            <Button colorScheme="orange" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bg} minH="100vh" pt="60px">
      <Container maxW="800px" py={6}>
        <VStack spacing={6} align="stretch">
          {/* Story Card */}
          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            overflow="hidden"
          >
            <HStack spacing={0} align="stretch">
              {/* Vote Section */}
              <VStack
                spacing={1}
                p={4}
                bg={useColorModeValue('gray.50', '#161617')}
                minW="60px"
              >
                <IconButton
                  aria-label="Upvote"
                  icon={<ChevronUpIcon />}
                  size="md"
                  variant="ghost"
                  color={userVote === 'up' ? 'orange.500' : 'gray.400'}
                  onClick={() => handleVote('up')}
                />
                <Text fontSize="lg" fontWeight="bold">
                  {story.upvotes + (userVote === 'up' ? 1 : userVote === 'down' ? -1 : 0)}
                </Text>
                <IconButton
                  aria-label="Downvote"
                  icon={<ChevronDownIcon />}
                  size="md"
                  variant="ghost"
                  color={userVote === 'down' ? 'blue.500' : 'gray.400'}
                  onClick={() => handleVote('down')}
                />
              </VStack>

              {/* Content Section */}
              <VStack flex={1} align="stretch" spacing={4} p={6}>
                {/* Header */}
                <VStack align="flex-start" spacing={2}>
                  <HStack spacing={2} fontSize="sm" color={textColor}>
                    <Text fontWeight="bold">r/{story.subreddit}</Text>
                    <Text>•</Text>
                    <Text>Posted by u/{story.author}</Text>
                    <Text>•</Text>
                    <Text>{formatDistanceToNow(new Date(story.created_at))} ago</Text>
                  </HStack>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="xl" fontWeight="bold" lineHeight="1.3">
                      {story.title}
                    </Text>
                    {story.is_narrated && (
                      <Badge colorScheme="green" variant="subtle">
                        <HStack spacing={1}>
                          <FaVolumeUp size={10} />
                          <Text fontSize="xs">AI Narrated</Text>
                        </HStack>
                      </Badge>
                    )}
                  </HStack>
                </VStack>

                {/* Audio Player */}
                {story.is_narrated && (
                  <Box
                    bg={useColorModeValue('orange.50', 'orange.900')}
                    p={4}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="orange.200"
                  >
                    <HStack justify="space-between">
                      <HStack spacing={3}>
                        <Button
                          leftIcon={isPlaying ? <FaPause /> : <FaPlay />}
                          colorScheme="orange"
                          size="sm"
                          onClick={handlePlayAudio}
                        >
                          {isPlaying ? 'Pause' : 'Listen to Story'}
                        </Button>
                        <Text fontSize="sm" color="orange.600">
                          🎧 AI-generated narration • 8 min read
                        </Text>
                      </HStack>
                    </HStack>
                  </Box>
                )}

                {/* Story Content */}
                <Box>
                  <Text lineHeight="1.6" whiteSpace="pre-line">
                    {story.content}
                  </Text>
                </Box>

                <Divider />

                {/* Actions */}
                <HStack spacing={4}>
                  <Button
                    leftIcon={<FaShare />}
                    variant="ghost"
                    size="sm"
                    color={textColor}
                  >
                    Share
                  </Button>
                  <Button
                    leftIcon={<FaBookmark />}
                    variant="ghost"
                    size="sm"
                    color={textColor}
                  >
                    Save
                  </Button>
                  {!story.is_narrated && (
                    <Button
                      leftIcon={<FaVolumeUp />}
                      variant="outline"
                      size="sm"
                      colorScheme="orange"
                    >
                      Generate Audio
                    </Button>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Box>

          {/* Comments Section */}
          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            p={6}
          >
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="bold">
                Comments ({story.comments})
              </Text>

              {/* Add Comment */}
              <VStack spacing={3} align="stretch">
                <Textarea
                  placeholder="What are your thoughts?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  bg={useColorModeValue('gray.50', '#272729')}
                  border="1px solid"
                  borderColor={borderColor}
                />
                <HStack justify="flex-end">
                  <Button colorScheme="orange" size="sm">
                    Comment
                  </Button>
                </HStack>
              </VStack>

              <Divider />

              {/* Sample Comments */}
              <VStack spacing={4} align="stretch">
                <HStack align="flex-start" spacing={3}>
                  <Avatar size="sm" name="user1" />
                  <VStack align="flex-start" spacing={1} flex={1}>
                    <HStack spacing={2} fontSize="sm">
                      <Text fontWeight="bold">spooky_reader</Text>
                      <Text color={textColor}>2 hours ago</Text>
                    </HStack>
                    <Text>
                      This gave me chills! Please update us on what you found behind the door. 
                      The way you described the cold handle really got to me.
                    </Text>
                    <HStack spacing={2} fontSize="sm">
                      <Button size="xs" variant="ghost">↑ 45</Button>
                      <Button size="xs" variant="ghost">Reply</Button>
                    </HStack>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}