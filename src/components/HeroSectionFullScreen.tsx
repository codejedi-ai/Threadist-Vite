import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSectionFullScreen.css'; // Corrected the CSS import path

const HeroSectionFullScreen = () => {
  return (
    <div className="hero-fullscreen-container">
      <img src="/assets/hero-isometric-full.png" alt="Full Screen Isometric Showcase" className="hero-fullscreen-image" />
      <div className="hero-overlay-content">
        <h1 className="hero-title glowing-text">Pandora Vault AI</h1>
        <p className="hero-subtitle">
          Design, visualize and optimize defensive structures for Minecraft faction gameplay
          and anarchy servers like <span className="highlight">2b2t</span>.
        </p>

      </div>
    </div>
  );
};

export default HeroSectionFullScreen;