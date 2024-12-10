import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Box, TextField, Button, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Send from '@mui/icons-material/Send';
// Decode JWT token manually without external dependency
const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded token payload:", payload);
    return payload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const ChatWindow = ({ selectedCommunity, setSelectedCommunity, userToken }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const chatContainerRef = useRef();
  const currentUserId = decodeToken(userToken)?.id;

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedCommunity) {
      const newSocket = io("https://crafteria.onrender.com");

      newSocket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      newSocket.emit("join-room", { community: selectedCommunity, token: userToken });

      newSocket.on("load-messages", (loadedMessages) => {
        console.log("Loaded messages:", loadedMessages);
        setMessages(loadedMessages);
      });

      newSocket.on("new-message", (msg) => {
        console.log("New message received:", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [selectedCommunity, userToken]);

  const sendMessage = () => {
    if (messageInput.trim() && socket) {
      socket.emit("message", {
        community: selectedCommunity,
        message: messageInput,
        token: userToken,
      });
      setMessageInput("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "99vh",
        '@media (max-width:768px)': {
          height: "90vh",
          p:1
            },
        width: "100%",
        marginTop: "0rem",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Back Arrow Logic */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          p: 2,
        }}
      >
        <IconButton onClick={() => setSelectedCommunity(null)} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">{selectedCommunity} Group</Typography>
      </Box>

      {/* Messages Section */}
      <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 1,
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: msg.userId === currentUserId ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.9rem",
                color: "#000000",
                mt: 0.5,
              }}
            >
              {msg.name || "Anonymous"}
            </Typography>
            <Paper
              sx={{
                p: 1,
                maxWidth: "60%",
                backgroundColor: msg.userId === currentUserId ? "#760a7d" : "#eeeeee",
                color: msg.userId === currentUserId ? "#ffffff" : "#000000",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body2">{msg.message}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Input Section */}
<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
  <TextField
    variant="outlined"
    placeholder="Type your message..."
    value={messageInput}
    onChange={(e) => setMessageInput(e.target.value)}
    sx={{
      flex: 1,
      mr: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: "50px", // Rounded corners
      },
    }}
  />
  
  {/* Send Icon in Circular Background */}
  <IconButton
    onClick={sendMessage}
    sx={{
      bgcolor: "#12710f", // Circular background color
      color: "white", // Icon color
      borderRadius: "50%", // Ensures circular shape
      width: 48, // Fixed size for the circle
      height: 48,
      "&:hover": {
        bgcolor: "primary.dark", // Darker shade on hover
      },
    }}
  >
    <Send />
  </IconButton>
</Box>

    </Box>
  );
};

export default ChatWindow;
