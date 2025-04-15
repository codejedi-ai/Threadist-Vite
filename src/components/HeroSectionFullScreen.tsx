import React from 'preact/compat';
import './HeroSectionFullScreen.css'; // Assuming the full-screen CSS

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
        <div className="hero-buttons">
          <button className="primary-button" onClick={() => (window.location.href = '/builder')}>
            Try the Generator
          </button>
          <button className="secondary-button" onClick={() => (window.location.href = '/gallery')}>
            View Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionFullScreen;