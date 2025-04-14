export type LightDarkMode = {mode: 'light' | 'dark' | 'system', 
  setMode: (mode: 'light' | 'dark' | 'system') => void, 
  isDarkMode: boolean, 
  setIsDarkMode: (isDarkMode: boolean) => void}
import { createContext } from 'preact';
// export the context

export const ThemeProvider = createContext({} as LightDarkMode)