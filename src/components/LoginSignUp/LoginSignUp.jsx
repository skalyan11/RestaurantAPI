import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginSignUp.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import test from '../../assets/test.png';

const LoginSignUp = ({ isLogin: initialIsLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  const handleSubmit = () => {
    // Redirect to welcome page after form submission
    navigate('/welcome');
  };

  const handleModeSwitch = (loginMode) => {
    setIsLogin(loginMode);
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
        <div className="LSinputs">
          {!isLogin && (
            <div className="LSinput">
              <img src={user_icon} alt="User Icon" />
              <input type="text" placeholder="Name" />
            </div>
          )}
          <div className="LSinput">
            <img src={email_icon} alt="Email Icon" />
            <input type="email" placeholder="Email Id" />
          </div>
          <div className="LSinput">
            <img src={password_icon} alt="Password Icon" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
        {!isLogin && (
          <div className="LSforgot-password">Forgot Password? <span>Click Here!</span></div>
        )}
        <div className="LSsubmit-container">
          <button
            className={`LSsubmit ${isLogin ? 'inactive' : 'active'}`}
            onClick={() => isLogin ? handleModeSwitch(false) : handleSubmit()}
          >
            Sign Up
          </button>
          <button
            className={`LSsubmit ${isLogin ? 'active' : 'inactive'}`}
            onClick={() => isLogin ? handleSubmit() : handleModeSwitch(true)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
