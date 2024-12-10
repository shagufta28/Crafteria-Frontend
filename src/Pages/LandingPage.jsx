import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import MiniImages from '../components/landing/MiniImages';
import CountingTimer from '../components/landing/CountingTimer';

// Example sound file (replace with your own)
const soundFile = '/sounds/notification.mp3'; // Make sure to add a valid sound file in your public folder

const LandingPage = () => {
  useEffect(() => {
    // Play sound when the page is loaded
    const audio = new Audio(soundFile);
    audio.play();
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        position: 'relative', // To position elements relative to this container
        minHeight: '70vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Navbar */}
      <Navbar />
      {/* Mini Images */}
      <MiniImages />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', // Align text at the top
          height: '60vh', // Full height of the viewport
          textAlign: 'center', // Centering text horizontally
          marginTop: '6rem', // To create space below the navbar
          padding: '0 2rem', // Adds space from left and right
          position: 'relative', // Relative position for inner elements
        }}
      >
        {/* Centered Text */}
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '3rem',
              fontFamily: 'Cursive, sans-serif', // Stylish font
              letterSpacing: '2px',
              lineHeight: 1.4, // Adjusts line height for better text spacing
            }}
          >
            Discover and Connect with People who{' '}
            <span style={{ color: '#FF69B4' }}>Share</span> Your Hobbies
          </Typography>
          <Typography
            variant="h5"
            paragraph
            sx={{
              color: '#555555',
              fontSize: '1.2rem',
              fontWeight: 'lighter',
              '@media (max-width:768px)': {
                fontSize: '0.6rem',
            },
              marginBottom: '2rem',
              lineHeight: '5', // Adjusts spacing between lines for readability
            }}
          >
            Join our vibrant community today and explore endless possibilities!
          </Typography>
          <CountingTimer/>

          <Button
            component={Link}
            to="/auth"
            variant="contained"
            sx={{
              backgroundColor: '#FFB6C1',
              ':hover': { backgroundColor: '#FF69B4' },
              color: '#4B0082',
              padding: '1rem 2rem',
              borderRadius: '30px',
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            Get Started
          </Button>
          <br />
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              marginTop:'1rem',
              backgroundColor: '#ffffff',
              ':hover': { backgroundColor: '#03afff' , color:'white'},
              color: '#1764f5',
              padding: '1rem 2rem',
              '@media (max-width:768px)': {
                marginBottom:"5rem",
            },
              borderRadius: '30px',
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            Login as an existing user
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
