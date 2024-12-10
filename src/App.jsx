import React, { useEffect, useState } from 'react';
import LandingPage from './Pages/LandingPage';  // Check the correct path
import LoginPage from './components/authentication/LoginPage';  // Check path
import SignUpPage from './components/authentication/SignUpPage';  // Check path
import { Route, Routes } from 'react-router-dom';
import Auth from './components/authentication/Auth';
import HomePage from './Pages/Layout';
import Explore from './pages/Explore';
import Dashboard from './components/home/Dashboard';
// import Community from './Pages/Community';
import Home from './pages/Home';
import CreatePost from './components/home/CreatePost';
import BottomNavigationBar from './components/Mobile/BottomNavigationBar';
import RightSidebar from './components/home/RightSidebar';
import ProfilePage from './Pages/ProfilePage';

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect viewport width changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/create-post" element={<CreatePost/>} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} /> 
      <Route path="/main" element={<Home />} />     
      <Route path="/explore" element={<Explore />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat" element={<RightSidebar/>} />
      <Route path="/profile" element={<ProfilePage/>} />


      {/* <Route path="/community" element={<Community />} /> */}
    </Routes>
    {/* Render bottom navbar only on mobile devices */}
    {isMobile && <BottomNavigationBar />}
    </>
  );
};

export default App;
