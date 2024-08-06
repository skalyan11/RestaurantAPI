import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/sign-in');
  };

  if (!user) {
    navigate('/sign-in');
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Welcome, {user}!</h1>
      <button onClick={() => navigate('/sign-in')} style={{ padding: '10px 20px' }}>
        Logout
      </button>
    </div>
  );
};

export default WelcomePage;