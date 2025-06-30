import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaReddit } from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';
import WaitlistModal from './waitlist/WaitlistModal';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const bg = useColorModeValue('white', '#1a1a1b');
  const borderColor = useColorModeValue('gray.200', '#343536');
  
  const isLandingPage = location.pathname === '/';
  
  const { isOpen: isAuthOpen, onOpen: onAuthOpen, onClose: onAuthClose } = useDisclosure();
  const { isOpen: isWaitlistOpen, onOpen: onWaitlistOpen, onClose: onWaitlistClose } = useDisclosure();
  const [authDefaultTab, setAuthDefaultTab] = useState(0);

  const handleSignUp = () => {
    setAuthDefaultTab(1);
    onAuthOpen();
  };

  const handleSignIn = () => {
    setAuthDefaultTab(0);
    onAuthOpen();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
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
        borderColor={borderColor}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
          <HStack spacing={4}>
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              <HStack spacing={2}>
                <FaReddit size={32} color="#ff4500" />
                <Text fontSize="xl" fontWeight="bold" color="orange.500">
                  Threadist
                </Text>
              </HStack>
            </Link>
          </HStack>

          {!isLandingPage && (
            <Box flex={1} maxW="600px" mx={8}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search stories, subreddits..."
                  bg={useColorModeValue('gray.50', '#272729')}
                  border="1px solid"
                  borderColor={useColorModeValue('gray.200', '#343536')}
                  _focus={{
                    borderColor: 'orange.500',
                    boxShadow: '0 0 0 1px #dd6b20',
                  }}
                />
              </InputGroup>
            </Box>
          )}

          <HStack spacing={4}>
            {isLandingPage && !user && (
              <HStack spacing={2}>
                <Button
                  as={RouterLink}
                  to="/home"
                  variant="ghost"
                  color="orange.500"
                >
                  Browse Stories
                </Button>
                <Button
                  variant="ghost"
                  onClick={onWaitlistOpen}
                >
                  Join Waitlist
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Button
                  colorScheme="orange"
                  size="sm"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </HStack>
            )}
            
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
            
            {!isLandingPage && user && (
              <Menu>
                <MenuButton>
                  <Avatar 
                    size="sm" 
                    name={user.user_metadata?.full_name || user.email} 
                    bg="orange.500" 
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            )}

            {!isLandingPage && !user && (
              <HStack spacing={2}>
                <Button variant="ghost" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button colorScheme="orange" size="sm" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </HStack>
            )}
          </HStack>
        </Flex>
      </Box>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={onAuthClose} 
        defaultTab={authDefaultTab}
      />
      
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={onWaitlistClose} 
      />
    </>
  );
}