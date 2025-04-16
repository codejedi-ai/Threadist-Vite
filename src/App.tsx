import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Box } from "@chakra-ui/react";
import Home from "./pages/Home";
import Navbar from "./navbar";
import theme from "./theme";

import About from "./pages/About";





// Main Content with Routes
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

// Main App Component
export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <AppContent />
      </Router>
    </ChakraProvider>
  );
}
