import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginSignUp.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import test from '../../assets/test.png';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/auth/index1';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const LoginSignUp = ({ isLogin: initialIsLogin }) => {
  const navigate = useNavigate();
  const userLoggedIn = useAuth();
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      if (!isSigningIn) {
        setIsSigningIn(true);
        try {
          await doSignInWithEmailAndPassword(email, password);
          navigate('/welcome');
        } catch (error) {
          setError('Login failed: ' + error.message);
        }
        setIsSigningIn(false);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert('User registered successfully');
        handleSubmit(); // Redirect to welcome page after successful form submission
      } catch (error) {
        setError('An error occurred: ' + error.message);
      }
    }
  };

  const onGoogleSignIn = async () => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        navigate('/welcome');
      } catch (error) {
        setError('An error occurred: ' + error.message);
      }
      setIsSigningIn(false);
    }
  };

  const handleModeSwitch = (loginMode) => {
    setIsLogin(loginMode);
    // Clear the form fields when switching modes
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = () => {
    // Redirect to welcome page after form submission
    navigate('/welcome');
  };

  return (
    <div className='loginSignUpWrapper'>
      <Link to="/" className="logo-link">
        <img className="logo" src={test} alt="logo" />
      </Link>
      <div className='LScontainer'>
        <div className="LSheader">
          <div className="LStext">{isLogin ? 'Login' : 'Sign Up'}</div>
          <div className="LSunderline"></div>
        </div>
        <form className="LSinputs" onSubmit={handleFormSubmit}>
          {!isLogin && (
            <div className="LSinput">
              <img src={user_icon} alt="User Icon" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="LSinput">
            <img src={email_icon} alt="Email Icon" />
            <input
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="LSinput">
            <img src={password_icon} alt="Password Icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isLogin && (
            <div className="LSforgot-password">
              Forgot Password? <span>Click Here!</span>
            </div>
          )}
          {error && <div className="LSerror">{error}</div>}
          <div className="LSsubmit-container">
            <button type="submit" className={`LSsubmit ${isLogin ? 'active' : 'inactive'}`} disabled={isSigningIn}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            <button
              type="button"
              className="LSswitch"
              onClick={() => handleModeSwitch(!isLogin)}
            >
              {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
            {isLogin && (
              <button
                type="button"
                className="LSgoogle-signin"
                onClick={onGoogleSignIn}
                disabled={isSigningIn}
              >
                Sign in with Google
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;