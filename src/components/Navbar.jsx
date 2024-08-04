import React from 'react';
import { useNavigate } from 'react-router-dom';
import { navItems } from '../constants';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import test from '../assets/test.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    console.log('Navigating to sign-in page');
    navigate('/signin'); // Navigate to the sign-in page
  };

  const handleCreateAccountClick = () => {
    console.log('Navigating to create account page');
    navigate('/create-account'); // Navigate to the create account page
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-auto mr-2 object-contain" src={test} alt="logo" />
            <span className="text-xl tracking-tight">
              Discoverable
            </span>
          </div>
          
          <ul className="flex space-x-8 ml-10">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-black hover:text-blue-300">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex space-x-6">
            <button onClick={handleSignInClick} className="py-2 px-3 hover:text-blue-300 border rounded-md">
              Sign In
            </button>
            <button onClick={handleCreateAccountClick} className="py-2 px-3 rounded-md bg-gradient-to-r from-teal-100 to-teal-200">
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
