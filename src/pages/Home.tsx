import React from 'react';
import { Box, Flex, VStack, Text, Button, useColorModeValue, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  const cardBg = useColorModeValue('brand.100', 'brand.800');
  const buttonBg = useColorModeValue('brand.500', 'brand.400');

  return (
    <Flex minH="100vh" pt="60px">
      {/* Left Sidebar */}
      <VStack
        w="250px"
        bg="brand.900"
        p={4}
        spacing={4}
        align="stretch"
        borderRight="1px solid"
        borderColor="brand.700"
      >
        <Button variant="ghost" color="brand.300">Generate</Button>
        <Button variant="ghost" color="brand.300">Minecraft</Button>
        <Button variant="ghost" color="brand.300">Build</Button>
      </VStack>

      {/* Main Content */}
      <Box flex={1} p={8}>
        <Flex direction="column" align="center" justify="center" h="full">
          <Image
            src="/assets/hero-isometric-full.png"
            alt="Hero"
            maxW="800px"
            mb={8}
          />
          <VStack spacing={6}>
            <Text fontSize="2xl" color="brand.300">Welcome to CraftGPT</Text>
            <Button
              bg={buttonBg}
              color="white"
              size="lg"
              _hover={{ bg: 'brand.600' }}
            >
              Start Building
            </Button>
          </VStack>
        </Flex>
      </Box>

      {/* Right Sidebar */}
      <VStack
        w="250px"
        bg="brand.900"
        p={4}
        spacing={4}
        align="stretch"
        borderLeft="1px solid"
        borderColor="brand.700"
      >
        <Box bg={cardBg} p={4} borderRadius="md">
          <Text color="brand.300">Build Stats</Text>
        </Box>
        <Box bg={cardBg} p={4} borderRadius="md">
          <Text color="brand.300">Recent Builds</Text>
        </Box>
      </VStack>
    </Flex>
  );
}