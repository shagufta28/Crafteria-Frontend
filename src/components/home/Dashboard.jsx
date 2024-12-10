import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';
import MiniImages from '../landing/MiniImages';

const Dashboard = () => {
  return (
    <>
      <Box>
        <Container
          maxWidth="lg"
          sx={{
            marginLeft: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start', // Align text at the top
            height: '60vh',
            textAlign: 'center',
            marginTop: '6rem',
            padding: '0 2rem',
            position: 'relative',
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
                '@media (max-width:768px)': {
                  fontSize: '2.6rem',
                  mt: -7,
                  ml: -4,
                },
                fontSize: '3rem',
                fontFamily: 'Cursive, sans-serif',
                letterSpacing: '2px',
                lineHeight: 1.4,
              }}
            >
              Discover and <span style={{ color: '#eb3535' }}> Connect </span> with People who{' '}
              <span style={{ color: '#80b84b' }}>Share</span> Your Hobbies
            </Typography>
            <Typography
              variant="h5"
              paragraph
              sx={{
                color: '#555555',
                fontSize: '1.2rem',
                '@media (max-width:768px)': {
                  fontSize: '0.8rem',
                  ml: -6.6,
                },
                fontWeight: 'lighter',
                marginBottom: '1rem',
                lineHeight: '1.5',
              }}
            >
              Join our vibrant community today and explore endless possibilities!
            </Typography>
          </Box>
        </Container>

        {/* Image Always Visible but Scaled Down on Mobile */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '-17rem',
            textAlign: 'center',
            '@media (max-width:768px)': {
              img: {
                marginTop: '10rem',
                width: '10px', // Smaller size for mobile
              },
            },
          }}
        >
          <img
            src="/images/share-post.png"
            alt="Share your hobby"
            style={{
              width: '300px', // Default size for desktop
              height: 'auto',
              transform: 'rotate(-10deg)',
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
