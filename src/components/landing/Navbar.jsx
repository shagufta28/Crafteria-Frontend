import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const letters = [
    { char: "C", color: "#f862a5" },
    { char: "r", color: "#f8d96a" },
    { char: "a", color: "#9ce549" },
    { char: "f", color: "#4edbc8" },
    { char: "t", color: "#4e99db" },
    { char: "e", color: "#7b4edb" },
    { char: "r", color: "#db4e92" },
    { char: "i", color: "#000000" },
    { char: "a", color: "#dc7ea7" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "none", // Removes the bottom shadow
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            color: "#000000",
            fontFamily: 'Cursive, sans-serif', // Stylish font
            fontWeight: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              style={{
                color: "#000000",
                ':hover': { color:'white'}, // Always black text
                position: "relative",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "50%",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = letter.color + "33";  // Pastel background on hover

              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent"; // Transparent background on mouse leave
              }}
            >
              {letter.char}
            </span>
          ))}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
