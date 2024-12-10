import { Box } from '@mui/material';
import React from 'react';

const MiniImages = () => {
  return (
    <>
      {/* Facebook Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          '@media (max-width:768px)': {
            top: '10%',
            
            },
          width: { xs: '50px', sm: '100px' }, // Scale size down on small devices
          height: { xs: '50px', sm: '100px' },
        }}
      >
        <img
          src="/images/facebook.png"
          alt="Facebook"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      {/* YouTube Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '85%',
          '@media (max-width:768px)': {
            top: '20%',
            right: '80%',
            },
          transform: 'rotate(-25deg)',
          width: { xs: '40px', sm: '100px' },
          height: { xs: '40px', sm: '100px' },
        }}
      >
        <img
          src="/images/youtube.png"
          alt="YouTube"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      {/* Share Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '80%',
          '@media (max-width:768px)': {
            top: '40rem',
            right: '80%',
            },
          transform: 'rotate(8deg)',
          width: { xs: '60px', sm: '180px' },
          height: { xs: '60px', sm: '180px' },
        }}
      >
        <img
          src="/images/share-post.png"
          alt="Share"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      {/* Zigzag Line */}
      <Box
        sx={{
          position: 'relative',
          height: '3px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '21rem',
            left: '20%',
            '@media (max-width:768px)': {
            top: '32.3rem',
            left: '1%',
            },
            width: { xs: '100%', sm: '60%' }, // Scale width for mobile views
            height: '10px',
            backgroundImage:
              'linear-gradient(45deg, transparent 25%, #FF69B4 25%, #FF69B4 50%, transparent 50%, transparent 75%, #FF69B4 75%, #FF69B4 100%)',
            backgroundSize: '10px 10px',
            backgroundRepeat: 'repeat-x',
          }}
        />
      </Box>

      {/* New Post Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '65%',
          right: '15%',
          '@media (max-width:768px)': {
            top: '51rem',
            right: '1%',
            },
          width: { xs: '100px', sm: '200px' },
          height: { xs: '100px', sm: '200px' },
        }}
      >
        <img
          src="/images/new-post.png"
          alt="New Post"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </>
  );
};

export default MiniImages;
