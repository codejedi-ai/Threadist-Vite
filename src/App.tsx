import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Box } from "@chakra-ui/react";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import theme from "./theme";

// Optional About component
function About({ path }: { path?: string }) {
  return <h1>{path ? path + " " : ""}Welcome to the about page</h1>;
}

// Main app content using Chakra's Box (which accepts style props)
function AppContent() {
  return (
    <Box id="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Box>
  );
}

// Main App component wrapped with ChakraProvider and Router
export default function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* ColorModeScript sets the initial color mode on page load */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <AppContent />
      </Router>
    </ChakraProvider>
  );
}
