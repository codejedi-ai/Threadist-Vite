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
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ 
  config,
  colors: {
    brand: {
      50: '#e6ffea',
      100: '#b3ffc9',
      200: '#80ffa8',
      300: '#4dff87',
      400: '#1aff66',
      500: '#00e64d',
      600: '#00b33c',
      700: '#00802b',
      800: '#004d1a',
      900: '#001a09',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#001a09',
        color: 'white',
      },
    },
  },
});

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
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}