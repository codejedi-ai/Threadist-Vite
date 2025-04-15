// Navbar.tsx
import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  // Dynamic background and link colors based on the active color mode
  const bg = useColorModeValue('gray.100', 'gray.900');
  const linkColor = useColorModeValue('teal.500', 'teal.200');

  return (
    <Box
      as="nav"
      role="navigation"
      aria-label="Main Navigation"
      bg={bg}
      px={4}
      py={2}
      position="fixed"
      top={0}
      left={0}
      width="100%"
      zIndex={1000}  // ensures the navbar stays on top of other elements
      boxShadow="md" // optional: provides a subtle shadow for separation from content
    >
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <Link href="/" fontWeight="bold" color={linkColor}>
            Home
          </Link>
          <Link href="/about" fontWeight="bold" color={linkColor}>
            About
          </Link>
        </HStack>
        <HStack spacing={4}>
          <Link href="/services" fontWeight="bold" color={linkColor}>
            Services
          </Link>
          <Link href="/contact" fontWeight="bold" color={linkColor}>
            Contact
          </Link>
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </HStack>
      </Flex>
    </Box>
  );
}
