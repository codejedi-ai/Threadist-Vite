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
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPause, FaVolumeUp, FaShare, FaBookmark } from 'react-icons/fa';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { formatDistanceToNow } from 'date-fns';

export default function Story() {
  const { subreddit, postId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [comment, setComment] = useState('');

  const bg = useColorModeValue('#dae0e6', '#0b1426');
  const cardBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  // Mock story data
  const story = {
    id: postId || '1',
    title: 'I found a door in my basement that wasn\'t there yesterday',
    content: `This happened three days ago, and I still can't wrap my head around it. I've lived in this house for over ten years, and I know every inch of it like the back of my hand. The basement has always been my workshop - tools organized on pegboards, workbench in the corner, concrete walls painted white to make the space feel less dungeon-like.

But when I went down there Tuesday morning to grab my drill, there was a door. A wooden door, painted the same white as the walls, with a brass handle that looked like it had been there for decades. The thing is, I painted those walls myself five years ago. There was no door.

I stood there for what felt like hours, just staring at it. My rational mind was trying to come up with explanations. Maybe I had forgotten? Maybe it was always there and I just never noticed? But that's impossible. I've been down in that basement thousands of times. I would have noticed a door.

The door was positioned between my workbench and the water heater, in a spot where I definitely would have bumped into it countless times. Yet there it was, looking like it had always belonged there. The paint wasn't fresh - it had the same slight yellowing and small scuffs that the rest of the basement walls had accumulated over the years.

I reached for the handle, then stopped. Something felt wrong. Not just the impossibility of the door's existence, but something else. A feeling, like when you're alone in the house but can't shake the sensation that someone is watching you.

The brass handle was cold under my palm, colder than it should have been in the basement's consistent temperature. I turned it slowly, and it moved smoothly, well-oiled hinges making no sound as the door swung open.

What I saw on the other side changed everything I thought I knew about my house, my neighborhood, and maybe reality itself...`,
    author: 'throwaway_scared123',
    subreddit: subreddit || 'nosleep',
    upvotes: 2847,
    comments: 312,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isNarrated: true,
    audioUrl: '/audio/story1.mp3'
  };

  const handleVote = (voteType: 'up' | 'down') => {
    setUserVote(userVote === voteType ? null : voteType);
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // Audio playback logic would go here
  };

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
                  icon={<BiUpvote />}
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
                  icon={<BiDownvote />}
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
                    <Text>{formatDistanceToNow(story.createdAt)} ago</Text>
                  </HStack>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="xl" fontWeight="bold" lineHeight="1.3">
                      {story.title}
                    </Text>
                    {story.isNarrated && (
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
                {story.isNarrated && (
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
                  {!story.isNarrated && (
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