import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Navbar from '../landing/Navbar';
import MiniImages from '../landing/MiniImages';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const hobbiesList = ['Photography', 'Painting', 'Dance', 'Music', 'Gardening'];

const CreatePost = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [hobby, setHobby] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleCaptionChange = (event) => setCaption(event.target.value);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleHobbyChange = (event) => setHobby(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!caption || !image ) {
      alert('Please fill all required fields.');
      return;
    }
    setLoading(true); // Set loading to true when submitting

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('hobby', hobby);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('userToken');
      await axios.post('https://crafteria.onrender.com/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setToastOpen(true);
      setCaption('');
      setHobby('');
      setImage(null);
      setLoading(false); // Reset loading state after post is created
      navigate('/explore');
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false); // Reset loading state in case of error
    }
  };

  const handleToastClose = () => setToastOpen(false);

  return (
    <>
      <Navbar />
      {/* MiniImages Wrapper */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <MiniImages />
      </Box>
      <Box sx={{ padding: '2rem', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: '1rem', position: 'relative' }}>
            {image ? (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            ) : (
              <IconButton
                component="label"
                sx={{
                  width: '100%',
                  height: '200px',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <CameraAltIcon sx={{ fontSize: '40px', color: '#888' }} />
                <input type="file" hidden onChange={handleImageChange} />
              </IconButton>
            )}
          </Box>
          <TextField
            label="Caption"
            value={caption}
            onChange={handleCaptionChange}
            fullWidth
            multiline
            rows={3}
            sx={{ marginBottom: '1rem' }}
            required
          />
          {/* <FormControl fullWidth sx={{ marginBottom: '1rem' }} required>
            <InputLabel id="hobby-select-label">Hobby</InputLabel>
            <Select
              labelId="hobby-select-label"
              value={hobby}
              onChange={handleHobbyChange}
              label="Hobby"
            >
              {hobbiesList.map((hobbyItem) => (
                <MenuItem key={hobbyItem} value={hobbyItem}>
                  {hobbyItem}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Box sx={{ textAlign: 'center', marginTop: '1rem', '@media (max-width:768px)': { mt: 0 } }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginRight: '1rem' }}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Posting...' : 'Post'} {/* Show "Posting..." while submitting */}
            </Button>
            <Button
              component={Link}
              to="/main"
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
          Post created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreatePost;
