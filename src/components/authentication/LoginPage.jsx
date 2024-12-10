import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../landing/Navbar';
import MiniImages from '../landing/MiniImages';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await axios.post('https://crafteria.onrender.com/api/auth/login', formData);

      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('username', response.data.name);
        navigate('/main');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <MiniImages />
      <Container
        maxWidth="xs"
        sx={{
          marginTop: '4%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
        }}
      >
        <motion.div
          initial={{ y: '-100vh', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 70, damping: 15 }}
          style={{ width: '100%' }}
        >
          <Box
            sx={{
              width: '100%',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
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
              <IconButton onClick={() => navigate('/')} sx={{ color: '#65c9de' }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h4"
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#65c9de',
                  marginBottom: '1rem',
                  textShadow: '0px 4px 4px rgba(255, 255, 255, 0.671)',
                }}
              >
                Login
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
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
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
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  marginTop: '1rem',
                  padding: '0.8rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  background: '#65c9de',
                  ':hover': { background: '#58b0c7' },
                }}
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Login'}
              </Button>
            </form>
            <Typography
              variant="body2"
              sx={{
                marginTop: '1rem',
                textAlign: 'center',
                color: '#000000',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              Don’t have an account?{' '}
              <Link to="/auth" style={{ color: '#044efc', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </>
  );
};

export default LoginPage;
