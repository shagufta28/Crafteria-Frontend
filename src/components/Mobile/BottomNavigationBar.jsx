import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ChatIcon from '@mui/icons-material/Chat';
import Person2Icon from '@mui/icons-material/Person2';

const BottomNavigationBar = () => {
  const [value, setValue] = useState('home');

  return (
    <BottomNavigation
      value={value}
      onChange={(newValue) => setValue(newValue)}
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f8f8f8', // Light background for a sleek look
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for a futuristic feel
        borderTop: '1px solid #ddd', // Light border for separation
      }}
    >
      <BottomNavigationAction
        label="Dashboard"
        value="home"
        icon={<HomeIcon />}
        sx={{
          color: '#ff5f5f', // Red accent
          '&.Mui-selected': {
            color: '#d02765', // Darker red when selected
          },
        }}
        component={Link}
        to="/main"
      />
      <BottomNavigationAction
        label="Explore"
        value="explore"
        icon={<ExploreIcon />}
        sx={{
          color: '#4dbf6f', // Green accent
          '&.Mui-selected': {
            color: '#548238', // Darker green when selected
          },
        }}
        component={Link}
        to="/explore"
      />
      <BottomNavigationAction
        label="Add Post"
        value="addPost"
        icon={<AddBoxIcon />}
        sx={{
          color: '#00aaff', // Blue accent
          '&.Mui-selected': {
            color: '#0881de', // Darker blue when selected
          },
        }}
        component={Link}
        to="/create-post"
      />
      <BottomNavigationAction
        label="Chat"
        value="chat"
        icon={<ChatIcon />}
        sx={{
          color: '#9b2fae', // Purple accent
          '&.Mui-selected': {
            color: '#a34bb1', // Darker purple when selected
          },
        }}
        component={Link}
        to="/chat"
      />
      <BottomNavigationAction
        label="Profile"
        value="Profile"
        icon={<Person2Icon />}
        sx={{
          color: '#e44a71', // Pink accent
          '&.Mui-selected': {
            color: '#d02765', // Darker pink when selected
          },
        }}
        component={Link}
        to="/profile"
      />
    </BottomNavigation>
  );
};

export default BottomNavigationBar;
