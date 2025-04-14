import { h } from 'preact';
import { useState } from 'preact/hooks';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import '../styles/home.css';

export default function Home(props: { path?: string }) {
  return (
    <div class="home-container">
      {/* Hero Section */}
      <HeroSection />

      {/* Preview Section */}
      <PreviewSection />

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
    </div>
  );
}

/* Sub-components */

// Hero Section
function HeroSection() {
  return (
    <div class="hero-section">
      <h1 class="glowing-text">Pandora Vault AI</h1>
      <p class="tagline">
        Design, visualize and optimize defensive structures for Minecraft faction gameplay 
        and anarchy servers like <span class="highlight">2b2t</span>.
      </p>
      <div class="cta-buttons">
        <Button 
          primary 
          label="Try the Generator" 
          onClick={() => (window.location.href = '/builder')} 
        />
        <Button 
          label="View Gallery" 
          onClick={() => (window.location.href = '/gallery')} 
        />
      </div>
    </div>
  );
}

// Preview Section
function PreviewSection() {
  return (
    <div class="preview-container">
      <div class="preview-image">
        <div class="placeholder-preview">
          <span>3D Defense Preview</span>
        </div>
      </div>
    </div>
  );
}

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
    <div class="features-section">
      <h2>🛡️ Key Features</h2>
      <div class="feature-list">
        {features.map((feature) => (
          <Card key={feature.title} title={`${feature.icon} ${feature.title}`}>
            <p>{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
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
    <div class="specialized-section">
      <h2>🔥 Specialized for Faction Warfare</h2>
      <div class="feature-list">
        {specializedFeatures.map((item) => (
          <Card key={item.title} title={item.title}>
            <p>{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
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
    <div class="philosophy-section">
      <h2>🏠 Defense Philosophy</h2>
      <ol class="feature-list">
        {philosophyPrinciples.map((principle) => (
          <li key={principle.title}>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </li>
        ))}
      </ol>
    </div>
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
    <div class="testimonials-section">
      <h2>What Players Are Saying</h2>
      <div class="feature-list">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <p>"{testimonial.quote}"</p>
            <span class="testimonial-author">- {testimonial.author}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Bottom CTA Section
function BottomCTA() {
  return (
    <section class="bottom-cta">
      <h2>Ready to build your ultimate defense?</h2>
      <Button 
        primary
        size="large"
        label="Start Building Now" 
        onClick={() => (window.location.href = '/builder')} 
      />
    </section>
  );
}
