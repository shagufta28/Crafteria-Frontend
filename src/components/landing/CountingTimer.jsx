import { Box, Typography } from '@mui/material';
import React from 'react';
import CountUp from 'react-countup';

const CountingTimer = () => {
  return (
    <>
      {/* Single Counter Section with responsive styling */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          width: '100%',
          '@media (min-width: 600px)': {
            flexDirection: 'row', // Horizontal layout on medium or larger devices
          },
        }}
      >
        {/* Single row counter for mobile view */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              color: '#3abd89',
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '3rem' }, // Responsive font size
            }}
          >
            <CountUp start={0} end={5000} duration={8} />
            +
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#000000',
              fontWeight: 'lighter',
            }}
          >
            Live Users
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', ml:10  ,'@media (max-width:768px)': {
                ml:0,
            },}}>
          <Typography
            variant="h3"
            sx={{
              color: '#f8217e',
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '3rem' },
            }}
          >
            <CountUp start={0} end={12000} duration={5} />
            +
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#000000',
              fontWeight: 'lighter',
            }}
          >
            Followers
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' , ml:10, '@media (max-width:768px)': {
                ml:0,
            },}}>
          <Typography
            variant="h3"
            sx={{
              color: '#271e84',
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '3rem' },
            }}
          >
            <CountUp start={0} end={3500} duration={8} />
            +
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#000000',
              fontWeight: 'lighter',
            }}
          >
            Posts Created
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CountingTimer;
