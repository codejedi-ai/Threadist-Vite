import React, { useContext } from 'react';
import './navbar.css';
import { ThemeContext } from '../context/ThemeProvider';

export default function Navbar() {
  const { mode, setMode, isDarkMode } = useContext(ThemeContext);

  const toggleTheme = () => {
    const modes = ['light', 'dark', 'system'];
    const nextMode = modes[(modes.indexOf(mode) + 1) % modes.length];
    setMode(nextMode as 'dark' | 'light' | 'system');
  };

  // Get the appropriate icon for the current theme mode
  const getThemeIcon = () => {
    if (mode === 'light') return '🌙'; // Show moon to switch to dark
    if (mode === 'dark') return '💻'; // Show computer to switch to system
    return '🌞'; // Show sun to switch to light
  };

  // Get the appropriate tooltip text
  const getThemeTooltip = () => {
    if (mode === 'light') return 'Switch to dark mode';
    if (mode === 'dark') return 'Switch to system theme';
    return 'Switch to light mode';
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="nav-left">
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About</a>
      </div>
      <div className="nav-right">
        <a href="/services" className="nav-link">Services</a>
        <a href="/contact" className="nav-link">Contact</a>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={getThemeTooltip()}
          title={getThemeTooltip()}
        >
          {getThemeIcon()}
        </button>
      </div>
    </nav>
  );
}