import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Redirect to home after sign-in
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', margin: '10px', width: '200px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', margin: '10px', width: '200px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
