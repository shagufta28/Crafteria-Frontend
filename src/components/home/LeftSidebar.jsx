import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography, Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupsIcon from '@mui/icons-material/Groups';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [userData, setUserData] = useState({
    name: '',
    followersCount: 0,
    followingCount: 0,
    profilePicture: '', // Placeholder for profile picture URL
  });

  const [activeItem, setActiveItem] = useState('');

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://crafteria.onrender.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });

        setUserData({
          name: response.data.name,
          followersCount: response.data.followersCount,
          followingCount: response.data.followingCount,
          profilePicture: response.data.profilePicture || 'default-profile-picture.jpg',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Follow a user
  const followUser = async () => {
    try {
      const response = await axios.post('https://crafteria.onrender.com/api/users/follow', {
        userId: userData._id, // Assuming you have the user ID in state or context
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      // Update follower/following count in state
      if (response.data.success) {
        setUserData(prevState => ({
          ...prevState,
          followingCount: prevState.followingCount + 1,
        }));
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  // Unfollow a user
  const unfollowUser = async () => {
    try {
      const response = await axios.post('https://crafteria.onrender.com/api/users/unfollow', {
        userId: userData._id, // Assuming you have the user ID in state or context
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      // Update follower/following count in state
      if (response.data.success) {
        setUserData(prevState => ({
          ...prevState,
          followingCount: prevState.followingCount - 1,
        }));
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  // Function to handle hover effect
  const handleHover = (item) => {
    setActiveItem(item);
  };
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Box
      sx={{
        width: '300px',
        height: '100vh',
        backgroundColor: '#ffffff',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        padding: '1rem',
        boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* User Profile Section */}
      <Box sx={{ marginBottom: '2rem' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <img
            src="/images/welcome.png"
            style={{ borderRadius: '0%', width: '260px', height: '100px', marginBottom: '10px', marginRight:'10px', marginTop:'-20px' }}
          />
          <Typography variant="h6"sx={{marginTop:'1rem'}}>Welcome {userData.name} 😊</Typography>
          {/* <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px', marginRight: '20px' }}>
            <Typography variant="body2">
              <strong>{userData.followersCount}</strong> Followers
            </Typography>
            <Typography variant="body2">
              <strong>{userData.followingCount}</strong> Following
            </Typography>
          </Box> */}

          
        </Box>
      </Box>

      {/* Navigation List */}
      <List>
        <ListItem
          button
          component={Link}
          to="/create-post"
          onMouseEnter={() => handleHover('Add New Post')}
          onMouseLeave={() => handleHover('Add New Post')}
          onClick={() => setActiveItem('Add New Post')}
          sx={{
            borderRadius: '30px',
            backgroundColor: activeItem === 'Add New Post' ? 'white' : 'transparent',
            color: activeItem === 'Add New Post' ? 'black' : 'black',
            '&:hover': {
              backgroundColor: '#50a250',
              borderRadius: '30px',
              color: 'white',
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: activeItem === 'Add New Post' ? '' : 'black',
              '&:hover': {
                color: 'white'
              },
            }}
          >
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add New Post" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/main"
          onMouseEnter={() => handleHover('home')}
          onMouseLeave={() => handleHover('')}
          onClick={() => setActiveItem('home')}
          sx={{
            borderRadius: '30px',
            color: activeItem === 'home' ? 'black' : 'black',
            backgroundColor: activeItem === 'home' ? 'black' : 'transparent',
            '&:hover': {
              backgroundColor: '#f862a5',
              borderRadius: '30px',
              color: 'white',
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: activeItem === 'home' ? 'white' : 'black',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {/* Add more list items as needed */}
        <ListItem
          button       
          component={Link}
          to="/explore"
          onMouseEnter={() => handleHover('explore')}
          onMouseLeave={() => handleHover('')}
          onClick={() => setActiveItem('explore')}
          sx={{
            borderRadius: '30px',
            color: activeItem === 'home' ? 'black' : 'black',
            backgroundColor: activeItem === 'explore' ? 'cyan' : 'transparent',
            '&:hover': {
              backgroundColor: '#15118c',
              borderRadius: '30px',
              color: 'white'
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: activeItem === 'explore' ? 'white' : 'black',
              '&:hover': {
                color: 'white', // Change icon color to white on hover
              },
            }}
          >
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItem>

        {/* <ListItem
          button
          component={Link}
          to="/community"
          onMouseEnter={() => handleHover('community')}
          onMouseLeave={() => handleHover('')}
          onClick={() => setActiveItem('community')}
          sx={{
            borderRadius: '30px',
            color: activeItem === 'home' ? 'black' : 'black',
            backgroundColor: activeItem === 'community' ? 'lightgreen' : 'transparent',
            '&:hover': {
              backgroundColor: '#ffd723',
              borderRadius: '30px',
              color: 'white'
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: activeItem === 'community' ? 'white' : 'black',
              '&:hover': {
                color: 'white', // Change icon color to white on hover
              },
            }}
          >
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Community" />
        </ListItem> */}

      </List>

      {/* Footer Section (Settings and Logout) */}
      <Box sx={{ marginTop: 'auto', marginBottom: '2rem' }}>
        <ListItem
          button
          component={Link}
          to="/profile"
          onMouseEnter={() => handleHover('Profile')}
          onMouseLeave={() => handleHover('')}
          onClick={() => setActiveItem('Profile')}
          sx={{
            borderRadius: '30px',
            color: activeItem === 'home' ? 'white' : 'black',
            backgroundColor: activeItem === 'settings' ? 'lightblue' : 'transparent',
            '&:hover': {
              backgroundColor: '#0abfec',
              borderRadius: '30px',
              color: 'white',
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: activeItem === 'Profile' ? 'white' : 'black',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            <Person2Icon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/"
          onMouseEnter={() => handleHover('logout')}
          onMouseLeave={() => handleHover('')}
          onClick={() => setActiveItem('logout')}
          sx={{
            borderRadius: '30px',
            color: activeItem === 'home' ? 'red' : 'red',
            backgroundColor: activeItem === 'logout' ? 'lightcoral' : 'transparent',
            '&:hover': {
              backgroundColor: '#f13b3b',
              borderRadius: '30px',
              color: 'white',
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: activeItem === 'logout' ? 'white' : 'red',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;
