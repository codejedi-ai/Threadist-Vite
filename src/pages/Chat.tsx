import React, { useRef, useState, useEffect } from "react";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [displayAreaWidth, setDisplayAreaWidth] = useState(200);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector("nav"); // Adjust if your navbar has a different tag
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  const handleSidebarDrag = (e: MouseEvent) => {
    const newWidth = e.clientX;
    if (newWidth > 100 && newWidth < 500) {
      setSidebarWidth(newWidth);
    }
  };

  const handleDisplayAreaDrag = (e: MouseEvent) => {
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 100 && newWidth < 500) {
      setDisplayAreaWidth(newWidth);
    }
  };

  const handleSend = () => {
    console.log("Sending message:", input);
  };

  return (
    <Box
      display="flex"
      height={`calc(100vh - ${navbarHeight}px)`}
      marginTop={`${navbarHeight}px`}
    >
      {/* Sidebar */}
      <Box
        width={`${sidebarWidth}px`}
        p={2}
        borderRight="2px solid gray"
        position="relative"
      >
        <Text fontWeight="bold">Sidebar Content</Text>
        <Text>Drag to resize.</Text>
        <Box
          position="absolute"
          top="0"
          right="0"
          width="4px"
          height="100%"
          cursor="ew-resize"
          onMouseDown={(e) => {
            document.addEventListener("mousemove", handleSidebarDrag);
            document.addEventListener("mouseup", () => {
              document.removeEventListener("mousemove", handleSidebarDrag);
            });
          }}
        ></Box>
      </Box>

      {/* Chat Area */}
      <Box flex="1" p={4}>
        <VStack spacing={3} align="stretch" height="100%">
          <Box flex="1" overflowY="auto" borderWidth="1px" p={2}>
            {messages.map((msg, index) => (
              <Text key={index} p={2} borderRadius="md">
                {msg}
              </Text>
            ))}
          </Box>
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSend} colorScheme="blue">
            Send
          </Button>
        </VStack>
      </Box>

      {/* Display Area */}
      <Box
        width={`${displayAreaWidth}px`}
        p={2}
        borderLeft="2px solid gray"
        position="relative"
      >
        <Text fontWeight="bold">Display Content</Text>
        <Text>Drag to resize.</Text>
        <Box
          position="absolute"
          top="0"
          left="0"
          width="4px"
          height="100%"
          cursor="ew-resize"
          onMouseDown={(e) => {
            document.addEventListener("mousemove", handleDisplayAreaDrag);
            document.addEventListener("mouseup", () => {
              document.removeEventListener("mousemove", handleDisplayAreaDrag);
            });
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Chat;