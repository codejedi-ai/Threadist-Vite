import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
} from '@chakra-ui/react';
import StoryCard from '../components/StoryCard';
import Sidebar from '../components/Sidebar';
import { FaFire, FaRocket, FaClock, FaVolumeUp } from 'react-icons/fa';

// Mock data
const mockStories = [
  {
    id: '1',
    title: 'I found a door in my basement that wasn\'t there yesterday',
    content: 'This happened three days ago, and I still can\'t wrap my head around it. I\'ve lived in this house for over ten years, and I know every inch of it like the back of my hand. The basement has always been my workshop - tools organized on pegboards, workbench in the corner, concrete walls painted white to make the space feel less dungeon-like. But when I went down there Tuesday morning to grab my drill, there was a door. A wooden door, painted the same white as the walls, with a brass handle that looked like it had been there for decades. The thing is, I painted those walls myself five years ago. There was no door...',
    author: 'throwaway_scared123',
    subreddit: 'nosleep',
    upvotes: 2847,
    comments: 312,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isNarrated: true,
    audioUrl: '/audio/story1.mp3'
  },
  {
    id: '2',
    title: 'TIFU by accidentally joining a Zoom call while my girlfriend was practicing her OnlyFans content',
    content: 'This literally happened 30 minutes ago and I\'m still mortified. I work from home and have back-to-back meetings all day. My girlfriend also works from home doing content creation (she has an OnlyFans account, which I\'m totally supportive of). We usually coordinate our schedules to avoid any awkward situations. Today, I had what I thought was a routine team meeting at 2 PM. I clicked the Zoom link, joined the call, and immediately noticed something was off. First, there were way more people than usual - like 50+ participants instead of our usual 8-person team. Second, everyone had their cameras off except... my girlfriend, who was in the middle of what can only be described as a very enthusiastic performance in our living room, which is visible from my home office...',
    author: 'embarrassed_bf_2024',
    subreddit: 'tifu',
    upvotes: 15420,
    comments: 1205,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isNarrated: false
  },
  {
    id: '3',
    title: 'My neighbor has been leaving increasingly bizarre notes on my door',
    content: 'I moved into my apartment six months ago, and for the first few months, everything was normal. My neighbor across the hall seemed like a quiet, older woman who kept to herself. Then the notes started. The first one was innocent enough: "Your music was a bit loud last night. Please keep it down after 10 PM. Thanks, Margaret." Fair enough, I thought, even though I hadn\'t played any music that night. I made sure to be extra quiet anyway. The second note came a week later: "I can hear you walking around at night. The floorboards creak. Please wear slippers." Again, weird but not completely unreasonable. I bought some slippers. But then the notes got stranger...',
    author: 'confused_tenant',
    subreddit: 'LetsNotMeet',
    upvotes: 892,
    comments: 156,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isNarrated: true,
    audioUrl: '/audio/story3.mp3'
  }
];

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const bg = useColorModeValue('#dae0e6', '#0b1426');

  return (
    <Box bg={bg} minH="100vh" pt="60px">
      <Container maxW="1200px" py={6}>
        <Flex gap={6}>
          {/* Main Content */}
          <Box flex={1}>
            <VStack spacing={4} align="stretch">
              {/* Header */}
              <HStack justify="space-between" align="center">
                <HStack spacing={4}>
                  <Text fontSize="2xl" fontWeight="bold">
                    Popular Stories
                  </Text>
                  <Badge colorScheme="orange" variant="subtle">
                    <HStack spacing={1}>
                      <FaVolumeUp size={10} />
                      <Text fontSize="xs">AI Narrated Available</Text>
                    </HStack>
                  </Badge>
                </HStack>
              </HStack>

              {/* Sorting Tabs */}
              <Tabs
                index={selectedTab}
                onChange={setSelectedTab}
                variant="soft-rounded"
                colorScheme="orange"
              >
                <TabList>
                  <Tab>
                    <HStack spacing={2}>
                      <FaFire />
                      <Text>Hot</Text>
                    </HStack>
                  </Tab>
                  <Tab>
                    <HStack spacing={2}>
                      <FaRocket />
                      <Text>Rising</Text>
                    </HStack>
                  </Tab>
                  <Tab>
                    <HStack spacing={2}>
                      <FaClock />
                      <Text>New</Text>
                    </HStack>
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0}>
                    <VStack spacing={4} align="stretch">
                      {mockStories.map((story) => (
                        <StoryCard key={story.id} story={story} />
                      ))}
                    </VStack>
                  </TabPanel>
                  <TabPanel px={0}>
                    <VStack spacing={4} align="stretch">
                      {mockStories.slice().reverse().map((story) => (
                        <StoryCard key={story.id} story={story} />
                      ))}
                    </VStack>
                  </TabPanel>
                  <TabPanel px={0}>
                    <VStack spacing={4} align="stretch">
                      {mockStories.slice().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((story) => (
                        <StoryCard key={story.id} story={story} />
                      ))}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
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