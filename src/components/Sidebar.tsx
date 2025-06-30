import React from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  useColorModeValue,
  Divider,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import { FaFire, FaRocket, FaClock, FaPlus } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const popularSubreddits = [
  { name: 'nosleep', members: '15.2M', icon: '👻' },
  { name: 'WritingPrompts', members: '14.8M', icon: '✍️' },
  { name: 'tifu', members: '17.1M', icon: '🤦' },
  { name: 'AmItheAsshole', members: '3.2M', icon: '🤔' },
  { name: 'relationship_advice', members: '3.8M', icon: '💕' },
  { name: 'LetsNotMeet', members: '1.2M', icon: '😰' },
];

export default function Sidebar() {
  const bg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');

  return (
    <VStack spacing={4} align="stretch">
      {/* Sorting Options */}
      <Box
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        p={4}
      >
        <Text fontWeight="bold" mb={3}>
          Sort Stories
        </Text>
        <VStack spacing={2} align="stretch">
          <Button
            leftIcon={<FaFire />}
            variant="ghost"
            justifyContent="flex-start"
            colorScheme="orange"
          >
            Hot
          </Button>
          <Button
            leftIcon={<FaRocket />}
            variant="ghost"
            justifyContent="flex-start"
          >
            Rising
          </Button>
          <Button
            leftIcon={<FaClock />}
            variant="ghost"
            justifyContent="flex-start"
          >
            New
          </Button>
        </VStack>
      </Box>

      {/* Popular Communities */}
      <Box
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        p={4}
      >
        <HStack justify="space-between" mb={3}>
          <Text fontWeight="bold">Popular Communities</Text>
          <Button size="xs" leftIcon={<FaPlus />} colorScheme="orange">
            Join
          </Button>
        </HStack>
        <VStack spacing={3} align="stretch">
          {popularSubreddits.map((sub) => (
            <HStack
              key={sub.name}
              as={RouterLink}
              to={`/r/${sub.name}`}
              spacing={3}
              p={2}
              borderRadius="md"
              _hover={{ bg: useColorModeValue('gray.50', '#272729') }}
              cursor="pointer"
            >
              <Avatar size="sm" name={sub.name} bg="orange.500">
                {sub.icon}
              </Avatar>
              <VStack align="flex-start" spacing={0} flex={1}>
                <Text fontSize="sm" fontWeight="medium">
                  r/{sub.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {sub.members} members
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* Audio Features */}
      <Box
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        p={4}
      >
        <Text fontWeight="bold" mb={3}>
          Audio Features
        </Text>
        <VStack spacing={2} align="stretch">
          <Text fontSize="sm" color="gray.500">
            🎧 AI-powered narration
          </Text>
          <Text fontSize="sm" color="gray.500">
            🔊 Multiple voice options
          </Text>
          <Text fontSize="sm" color="gray.500">
            ⚡ Instant audio generation
          </Text>
          <Button size="sm" colorScheme="orange" mt={2}>
            Upgrade to Premium
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
}