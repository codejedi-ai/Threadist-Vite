import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navbar';
import { ThemeProvider, ThemeContext } from './context/ThemeProvider';

// Example About component that optionally accepts a "path" prop
function About({ path }: { path?: string }) {
  return <h1>{path ? path + ' ' : ''}Welcome to the about page</h1>;
}

// Main app component that uses ThemeContext
function AppContent() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div id="app" data-theme={isDarkMode ? 'dark' : 'light'}>
      <div className="app-container">
        <div className="content">
          <Navbar />
          <Home />
        </div>
      </div>
    </div>
  );
}

// Main App component with ThemeProvider and Router wrapped around the content
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
