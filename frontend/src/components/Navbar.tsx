import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const guest = localStorage.getItem('dg_guest');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('dg_guest');
    navigate('/auth');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        Digital Guidance
      </div>
      <div className="space-x-4">
        {!token && !guest && (
          <>
            <button onClick={() => navigate('/auth')} className="hover:underline">
              Login
            </button>
            <button onClick={() => navigate('/auth')} className="hover:underline">
              Signup
            </button>
          </>
        )}
        {(token || guest) && (
          <>
            <button onClick={() => navigate('/profile')} className="hover:underline">
              Profile
            </button>
            <button onClick={() => navigate('/quiz')} className="hover:underline">
              Quiz
            </button>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
