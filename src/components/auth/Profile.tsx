import React from "react";
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Avatar, 
  Spinner,
  useColorModeValue 
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const cardBg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');

  if (isLoading) {
    return (
      <Box 
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        p={6}
        textAlign="center"
      >
        <Spinner size="lg" color="orange.500" />
        <Text mt={4} color="gray.500">Loading profile...</Text>
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      p={6}
    >
      <HStack spacing={4}>
        <Avatar 
          size="lg" 
          src={user.picture} 
          name={user.name}
          bg="orange.500"
        />
        <VStack align="flex-start" spacing={1}>
          <Text fontSize="xl" fontWeight="bold">
            {user.name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {user.email}
          </Text>
          {user.nickname && (
            <Text color="orange.500" fontSize="sm">
              @{user.nickname}
            </Text>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default Profile;