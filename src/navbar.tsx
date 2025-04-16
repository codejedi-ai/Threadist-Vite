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
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  // Dynamic background color based on the active color mode
  const bg = useColorModeValue('gray.100', 'gray.900');
  const linkColor = useColorModeValue('teal.500', 'teal.200');
  const linkFontSize = 'md'; // You can adjust this size (e.g., 'sm', 'xs')

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
      zIndex={1000}
      boxShadow="md"
    >
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <Link href="/" fontWeight="bold" color={linkColor} fontSize={linkFontSize}>
            Home
          </Link>
          <Link href="/about" fontWeight="bold" color={linkColor} fontSize={linkFontSize}>
            About
          </Link>
        </HStack>
        <HStack spacing={4}>
          <Link href="/services" fontWeight="bold" color={linkColor} fontSize={linkFontSize}>
            Services
          </Link>
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            fontSize={linkFontSize} // Apply the same size to the icon (optional)
          />
          <Link href="/sign-in" fontWeight="bold" color={linkColor} fontSize={linkFontSize}>
            Sign In
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}