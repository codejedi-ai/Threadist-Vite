import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Box } from "@chakra-ui/react";
import Home from "./pages/Home";
import Navbar from "./navbar";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import About from "./pages/About";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({ config });



// Main App Component
export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
      <Box id="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </Box>
      </Router>
    </ChakraProvider>
  );
}
