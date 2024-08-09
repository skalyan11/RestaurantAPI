import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import axios from 'axios';
import './LoginSignUp.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import test from '../../assets/test.png';

const LoginSignUp = ({ isLogin: initialIsLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register-user';
    const data = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(endpoint, data);
      alert(response.data.message);
      if (response.data.success || response.status === 201) {
        handleSubmit(); // Redirect to welcome page after successful form submission
      }
    } catch (error) {
      alert('An error occurred: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleModeSwitch = (loginMode) => {
    setIsLogin(loginMode);
    // Clear the form fields when switching modes
    setName('');
    setEmail('');
    setPassword('');
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
          <div className="LSforgot-password">
            {!isLogin && 'Forgot Password? '}
            <span>{!isLogin && 'Click Here!'}</span>
          </div>
          <div className="LSsubmit-container">
            <button type="submit" className={`LSsubmit ${isLogin ? 'active' : 'inactive'}`}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            <button
              type="button"
              className="LSswitch"
              onClick={() => handleModeSwitch(!isLogin)}
            >
              {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;