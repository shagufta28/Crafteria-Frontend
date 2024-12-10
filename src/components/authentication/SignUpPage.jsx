import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://crafteria.onrender.com/api/auth/register', formData);

      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        navigate('/main');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '0 1rem',
      }}
    >
      <motion.div
        initial={{ y: '-100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70, damping: 15 }}
        style={{
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(78, 78, 78, 0.2)',
            '@media (max-width:768px)': {
              width: '85%',
              padding: '1.5rem',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <IconButton
              onClick={() => navigate('/')}
              sx={{ color: '#ff0062' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              sx={{
                flex: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#ff0062',
                fontSize: {
                  xs: '1.8rem',
                  sm: '2rem',
                  md: '2.4rem',
                },
              }}
            >
              Sign Up
            </Typography>
          </Box>
          {error && (
            <Typography
              color="error"
              sx={{
                textAlign: 'center',
                marginBottom: '1rem',
              }}
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                '@media (max-width:768px)': {
                  padding: '8px',
                },
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                '@media (max-width:768px)': {
                  padding: '8px',
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                '@media (max-width:768px)': {
                  padding: '8px',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: '1.5rem',
                padding: '0.8rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '25px',
                background: '#ff0062',
                ':hover': {
                  background: '#d0004f',
                },
              }}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{
              marginTop: '1.5rem',
              textAlign: 'center',
              color: '#555555',
              fontSize: {
                xs: '0.9rem',
                sm: '1rem',
                md: '1rem',
              },
            }}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#ff0062',
                textDecoration: 'none',
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default SignupPage;
