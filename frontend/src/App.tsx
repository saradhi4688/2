import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Profile from './components/Profile';
import ProfileSetup from './components/ProfileSetup';
import Quiz from './components/Quiz';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/profile-setup" element={isLoggedIn ? <ProfileSetup /> : <Navigate to="/auth" />} />
        <Route path="/quiz" element={isLoggedIn ? <Quiz /> : <Navigate to="/auth" />} />
        <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
