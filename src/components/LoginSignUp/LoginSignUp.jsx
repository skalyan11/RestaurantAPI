import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
  };

  const handleLogin = () => {
    // You could add your login logic here before redirecting
    navigate('/welcome');
  };

  return (
    <div className='loginSignUpWrapper'>
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
          <div 
            className={`LSsubmit ${!isLogin ? '' : 'notActive'}`} 
            onClick={handleSignUpClick}
          >
            Sign Up
          </div>
          <div 
            className={`LSsubmit ${isLogin ? '' : 'notActive'}`} 
            onClick={handleLoginClick}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
