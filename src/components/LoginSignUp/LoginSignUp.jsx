import React from 'react'
import './LoginSignUp.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'


const LoginSignUp = () => {
  return (
    <div className='loginSignUpWrapper'>
    <div className='LScontainer'>
      <div className="LSheader">
        <div className="LStext">Sign Up</div>
        <div className="LSunderline"></div>
      </div>
      <div className="LSinputs">
        <div className="LSinput">
            <img src={user_icon} alt=""/>
            <input type="text" placeholder="Name" />
        </div>
        <div className="LSinput">
            <img src={email_icon} alt=""/>
            <input type="email" placeholder="Email Id"/>
        </div>
        <div className="LSinput">
            <img src={password_icon} alt=""/>
            <input type="password" placeholder="Password"/>
        </div>
      </div>
      
      <div className="LSforgot-password">Lost Password? <span>Click Here!</span></div>

      <div className="LSsubmit-container">
        <div className="LSsubmit">Sign Up</div>
        <div className="LSsubmit">Login</div>
        
      </div>

    </div>
    </div>
  )
}

export default LoginSignUp
