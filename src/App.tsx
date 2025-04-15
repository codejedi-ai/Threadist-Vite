import Router from "preact-router";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import { useState, useEffect, useContext } from 'preact/hooks';

import LeftSidebar from "./components/sidebar/LeftSidebar";
import { ThemeProvider, ThemeContext } from "./context/ThemeProvider";

function About(props: { path?: string }) {
  return <h1>{props.path} Welecome to the about page</h1>;
}

// The main app component that will be wrapped with ThemeProvider
function AppContent() {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <div id="app" data-theme={isDarkMode ? 'dark' : 'light'}>
      <Navbar />
      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </div>
  );
}

// Main App component with ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
