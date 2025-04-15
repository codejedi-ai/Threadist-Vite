import './navbar.css';
import { useContext } from 'preact/hooks';
import { ThemeContext } from '../context/ThemeProvider';

export default function Navbar() {
  const { mode, setMode, isDarkMode } = useContext(ThemeContext);
  
  const toggleTheme = () => {
    // Cycle through light, dark, system modes
    if (mode === 'light') {
      setMode('dark');
    } else if (mode === 'dark') {
      setMode('system');
    } else {
      setMode('light');
    }
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
    <nav class="navbar" role="navigation" aria-label="Main Navigation">
      <div class="nav-left">
        <a href="/" class="nav-link">Home</a>
        <a href="/about" class="nav-link">About</a>
      </div>
      <div class="nav-right">
        <a href="/services" class="nav-link">Services</a>
        <a href="/contact" class="nav-link">Contact</a>
        <button 
          onClick={toggleTheme} 
          class="theme-toggle" 
          aria-label={getThemeTooltip()}
          title={getThemeTooltip()}
        >
          {getThemeIcon()}
        </button>
      </div>
    </nav>
  );
}
