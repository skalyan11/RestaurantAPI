import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignUp = ({ isLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isLogin) {
      // Login logic here
      navigate('/welcome');  // Assuming '/welcome' is your target route after login
    } else {
      // Signup logic here
      navigate('/welcome');  // Assuming '/welcome' is your target route after signup
    }
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
          <button className={`LSsubmit ${!isLogin ? 'active' : ''}`} onClick={() => handleSubmit(false)}>Sign Up</button>
          <button className={`LSsubmit ${isLogin ? 'active' : ''}`} onClick={() => handleSubmit(true)}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
