import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Box, Typography } from "@mui/material";

const communities = ["Photography", "Gaming", "Cooking", "Painting", "Graphic Designing", "Sports"];

const CommunityList = ({ selectedCommunity, setSelectedCommunity }) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // Function to get current time in a formatted string
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (community) => {
    if (selectedCommunity === community) {
      setSelectedCommunity(null); // Deselect community
    } else {
      setSelectedCommunity(community); // Select community
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        p: 2,
        backgroundColor: "white",
        borderBottom: "1px solid #d3d3d3",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          mb: 3,
          mt: -30,
          '@media (max-width:768px)': {
            mt: -20,
            },
          color: "#333",
        }}
      >
        Community Groups
      </Typography>
      <List>
        {communities.map((community, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleClick(community)}
            sx={{
              cursor: "pointer",
              mb: 1,
              width: "24rem",
              backgroundColor: "#ffffff",
              p: 1,
              "&:hover": { backgroundColor: "#f8f7df" },
              display: "flex",
              justifyContent: "space-between", // Ensure name + circle is on the left and time is on the far right
              alignItems: "center",
            }}
          >
            {/* Left side - Circle with first letter and community name */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Circle with first letter */}
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#f1549b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                {community[0].toUpperCase()}
              </Box>

              {/* Community Name */}
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                {community}
              </Typography>
            </Box>

            {/* Time - Placed at the end */}
            <Typography
              sx={{
                fontSize: "14px",
                color: "#555",
              }}
            >
              {currentTime}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommunityList;
