import React, { useEffect, useState } from 'react';
import { Typography, Box, Avatar, CircularProgress, Card, CardContent, Grid, CardMedia } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePicture: '', // Placeholder for profile picture URL
  });

  const [userPosts, setUserPosts] = useState([]); // State to store user's posts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile data
        const userResponse = await axios.get('https://crafteria.onrender.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });

        setUserData({
          name: userResponse.data.name,
          email: userResponse.data.email,
          profilePicture: userResponse.data.profilePicture || 'default-profile-picture.jpg',
        });

        // Fetch the user ID from the response and use it to fetch posts
        const userId = userResponse.data._id;
        
        if (userId) {
          const postsResponse = await axios.get(`https://crafteria.onrender.com/api/posts/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });

          setUserPosts(postsResponse.data); // Store user posts in state
        } else {
          console.error('User ID is not available');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this only runs once when the component is mounted

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center', ml:5 }}>
      {/* User Profile Info */}
      <Avatar
        src={userData.profilePicture}
        alt={userData.name}
        sx={{ width: '100px', height: '100px', margin: '0 auto 1rem auto' }}
      />
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
        {userData.name}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '2rem' }}>
        {userData.email}
      </Typography>

      {/* User Posts */}
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
        My Posts
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card sx={{ maxWidth: 345, borderRadius: '0px' }}>
                {/* Image */}
                {post.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${post.image}`} // Assuming image URL comes from the backend
                    alt="Post Image"
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'sx', fontSize:"0.8rem" }}>
                    Caption: {post.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No posts to display.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Profile;
