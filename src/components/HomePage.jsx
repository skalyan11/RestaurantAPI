import React from 'react'
import Navbar from './Navbar.jsx'
import HeroSection from './HeroSection.jsx'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6"> 
      <HeroSection />
      </div>
    </>
  
  );
};

export default HomePage;
