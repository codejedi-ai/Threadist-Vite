// HeroSectionFullScreen.tsx
import React from 'react';
import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';

const HeroSectionFullScreen = () => {
  return (
    <Box position="relative" w="100%" h="100vh" overflow="hidden">
      <Image
        src="/assets/hero-isometric-full.png"
        alt="Full Screen Isometric Showcase"
        objectFit="cover"
        w="100%"
        h="100vh"
      />
      <Flex
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        align="center"
        justify="center"
        direction="column"
        bg="rgba(0, 0, 0, 0.5)"
      >
        <Heading as="h1" size="2xl" color="white" mb={4}>
          Pandora Vault AI
        </Heading>
        <Text fontSize="lg" color="white" textAlign="center" px={4}>
          Design, visualize and optimize defensive structures for Minecraft faction gameplay
          and anarchy servers like{' '}
          <Text as="span" color="teal.300" fontWeight="bold">
            2b2t
          </Text>.
        </Text>
      </Flex>
    </Box>
  );
};

export default HeroSectionFullScreen;
