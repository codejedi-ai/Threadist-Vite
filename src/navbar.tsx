import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Navbar() {
  const bg = useColorModeValue('brand.800', 'brand.900');
  const linkColor = useColorModeValue('brand.300', 'brand.200');

  return (
    <Box
      as="nav"
      bg={bg}
      px={4}
      py={2}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      borderBottom="1px solid"
      borderColor="brand.700"
    >
      <Flex justify="space-between" align="center" maxW="full" mx="auto">
        <Text fontSize="xl" fontWeight="bold" color={linkColor}>
          CraftGPT
        </Text>
        <HStack spacing={8}>
          <Link href="/" color={linkColor}>Home</Link>
          <Link href="/about" color={linkColor}>About</Link>
          <Link href="/chat" color={linkColor}>Chat</Link>
          <Link href="/sign-in" color={linkColor}>Sign In</Link>
        </HStack>
      </Flex>
    </Box>
  );
}