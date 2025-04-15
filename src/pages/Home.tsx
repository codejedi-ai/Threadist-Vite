
import { Link } from 'react-router-dom';
import {

  Button,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Center,
  Stack,
} from '@chakra-ui/react';
import HeroSectionFullScreen from '../components/HeroSectionFullScreen';
import { useColorModeValue } from '@chakra-ui/react';
// ...existing code...
import React from 'react';
import { Box, Heading, Text, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function Home(props: { path?: string }) {
  return (
    <Box id="home">
      <HeroSectionFullScreen />
      <Box className="home-container" maxWidth="1200px" mx="auto" py={8} px={{ base: 4, md: 6 }}>

        {/* Features Section */}
        <FeaturesSection />

        {/* Specialized Features Section */}
        <FactionWarfareSection />

        {/* Philosophy Section */}
        <PhilosophySection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Bottom CTA Section */}
        <BottomCTA />
      </Box>
    </Box>
  );
}

/* Sub-components */


// Features Section
function FeaturesSection() {
  const features = [
    {
      title: 'Defensive Structure Generation',
      description: 'Create obsidian bunkers, trapped walls, and TNT-resistant designs',
      icon: '🏰',
    },
    {
      title: 'Vulnerability Analysis',
      description: 'Identify weak points in your defenses against TNT cannons and withers',
      icon: '🔍',
    },
    {
      title: 'Raid Simulation',
      description: 'Test your defenses against common faction attack patterns',
      icon: '⚔️',
    },
    {
      title: '2b2t-Ready Designs',
      description: 'Templates tailored for anarchy server environments',
      icon: '🌐',
    },
    {
      title: 'Interactive 3D Preview',
      description: 'Examine and modify defenses from all angles',
      icon: '🔄',
    },
  ];

  return (
    <Box className="features-section" mt={12}>
      <Heading as="h2" size="xl" mb={6}>
        🛡️ Key Features
      </Heading>
      <SimpleGrid className="feature-list" columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {features.map((feature) => (
          <Card key={feature.title} boxShadow="md" borderRadius="md">
            <CardHeader>
              <Heading size="md">{feature.icon} {feature.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{feature.description}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

// Specialized Faction Warfare Section
function FactionWarfareSection() {
  const specializedFeatures = [
    { title: 'Wither-Proof Rooms', description: 'Protect valuables from wither destruction with specialized chamber designs' },
    { title: 'Water/Lava Curtain Systems', description: 'Advanced fluid-based defense designs that slow down raiders' },
    { title: 'TNT Cannon Resistant Walls', description: 'Optimize walls for raid prevention with blast-resistant patterns' },
    { title: 'Trap Design', description: 'Catch raiders with elaborate mechanisms and redstone contraptions' },
    { title: 'Resource Optimization', description: 'Maximize protection using minimal resources for survival gameplay' },
  ];

  return (
    <Box className="features-section" mt={12}>
      <Heading as="h2" size="xl" mb={6}>
        🔥 Specialized for Faction Warfare
      </Heading>
      <SimpleGrid className="feature-list" columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {specializedFeatures.map((item) => (
          <Card key={item.title} boxShadow="md" borderRadius="md">
            <CardHeader>
              <Heading size="md">{item.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{item.description}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

// Philosophy Section



function PhilosophySection() {
  const philosophyPrinciples = [
    { title: 'Keep unwanted players out', description: 'With obsidian layers, fluid curtains, and traps' },
    { title: 'Allow allies in', description: 'Secret redstone entrances, hidden paths, and secure access methods' },
    { title: 'Protect valuables', description: 'Secure vaults, hidden chambers, and decoy storage systems' },
    { title: 'Survive attacks', description: 'TNT, wither, and other exploit-resilient layouts designed for longevity' },
  ];

  return (
    <Box mt={12}>
      <Heading as="h2" size="xl" mb={6}>
        🏠 Defense Philosophy
      </Heading>
      <List spacing={4}>
        {philosophyPrinciples.map((principle) => (
          <ListItem key={principle.title} display="flex" alignItems="flex-start" gap={2}>
            <ListIcon as={CheckCircleIcon} color="teal.500" mt={1} />
            <Box>
              <Heading as="h3" size="md" mb={1}>
                {principle.title}
              </Heading>
              <Text>{principle.description}</Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}


// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'Built my first wither-proof vault and it survived a raid from the biggest faction on our server.',
      author: 'DiamondDefender92',
    },
    {
      quote: 'The 3D preview saved me tons of obsidian by optimizing my wall design before I built it.',
      author: '2b2tSurvivalist',
    },
  ];

  return (
    <Box className="features-section" mt={12}>
      <Heading as="h2" size="xl" mb={6}>
        What Players Are Saying
      </Heading>
      <SimpleGrid className="feature-list" columns={{ base: 1, md: 2 }} spacing={8}>
        {testimonials.map((testimonial, index) => (
          <Card key={index} boxShadow="md" borderRadius="md">
            <CardBody>
              <Text fontStyle="italic" mb={2}>
                "{testimonial.quote}"
              </Text>
              <Text textAlign="right" color="gray.600">
                - {testimonial.author}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

// Bottom CTA Section
function BottomCTA() {
  return (
    <Center className="bottom-cta" mt={16} py={12} borderRadius="md">
      <Stack spacing={4} align="center">
        <Heading as="h2" size="xl">
          Ready to build your ultimate defense?
        </Heading>
        <Link to="/builder">
          <Button colorScheme="green" size="lg">
            Try the Generator
          </Button>
        </Link>
        <Link to="/gallery">
          <Button variant="outline" colorScheme="green" size="lg">
            View Gallery
          </Button>
        </Link>
      </Stack>
    </Center>
  );
}