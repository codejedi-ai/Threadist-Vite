import { createContext, ComponentChildren } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export type LightDarkMode = {
  mode: 'light' | 'dark' | 'system',
  setMode: (mode: 'light' | 'dark' | 'system') => void,
  isDarkMode: boolean
}

// Create the context
export const ThemeContext = createContext({} as LightDarkMode);

// Create the provider component
export function ThemeProvider({ children }: { children: ComponentChildren }) {
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>(() => {
    // Read saved preference from local storage on initial load
    return (localStorage.getItem('themeMode') as 'light' | 'dark' | 'system') || 'light';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Determine initial dark mode state based on saved preference and system preference
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | 'system' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedMode === 'dark' || (savedMode === 'system' && prefersDark) || (savedMode === null && prefersDark && mode === 'system');
  });

  // Apply theme to DOM
  useEffect(() => {
    const appElement = document.getElementById('app');
    const shouldBeDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDarkMode(shouldBeDark);

    if (appElement) {
      appElement.setAttribute('data-theme', mode === 'system' ? 'system' : shouldBeDark ? 'dark' : 'light');
    }
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, [mode]);

  // Save user preference when mode changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Add transition styles on component mount
  useEffect(() => {
    if (!document.getElementById('theme-transition-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'theme-transition-styles';
      styleEl.textContent = `
        #app {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        #app * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []); // Run only once on mount

  // Listen for system preference changes if in system mode
  useEffect(() => {
    if (mode !== 'system') return () => {}; // Cleanup if mode changes

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
      const appElement = document.getElementById('app');
      if (appElement) {
        appElement.setAttribute('data-theme', 'system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}