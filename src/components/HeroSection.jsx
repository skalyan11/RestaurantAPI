import React from 'react';
import image1 from '../assets/image1.png'; // Replace with your actual image paths
import image2 from '../assets/image2.png'; // Replace with your actual image paths
import aboutImage1 from '../assets/aboutImage1.png'; // Replace with your actual image paths
import aboutImage2 from '../assets/aboutImage2.png'; // Replace with your actual image paths
import aboutImage3 from '../assets/aboutImage3.png'; // Replace with your actual image paths

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        <span className="bg-gradient-to-r from-green-500 to-green-800 text-transparent bg-clip-text">
          Places
        </span>
        {" "} at Your Disposal
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500">
        Having trouble choosing a place to eat? Start here
      </p>
      <div className="flex justify-center my-10">
        <a href="#" className="bg-gradient-to-r from-cyan-100 to-cyan-300 py-3 px-4 mx-3 rounded-md">
          Get Started Now
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border">
          Learn More
        </a>
      </div>
      <div className="flex justify-center my-10">
        <img src={image1} alt="Image 1" className="w-1/3 mx-2" />
        <img src={image2} alt="Image 2" className="w-1/3 mx-2" />
      </div>
      <div className="about-section mt-10 text-center">
        <h2 className="text-3xl font-bold">About our App</h2>
        <div className="flex flex-col items-center mt-6">
          <div className="about-item flex flex-col lg:flex-row items-center mx-4 my-4">
            <img src={aboutImage1} alt="About Image 1" className="w-full lg:w-1/4 h-auto rounded-lg shadow-md" />
            <p className="mt-4 lg:mt-0 lg:ml-4 text-lg text-neutral-500 text-left">
              Sign up to discover the best places to eat around you with our app. Start by searching a location and give a 
              radius for the search. You can also filter the search results to see the top viewed restaurants and top liked/disliked by users.
            </p>
          </div>
          <div className="about-item flex flex-col lg:flex-row items-center mx-4 my-4">
            <img src={aboutImage2} alt="About Image 2" className="w-full lg:w-1/4 h-auto rounded-lg shadow-md" />
            <p className="mt-4 lg:mt-0 lg:ml-4 text-lg text-neutral-500 text-left">
              With just one swipe, you can personally like or dislike a restaurant, and you can go through more information to see where it is, how it was rated by others,
              and what kind of food it serves. The algorithm will generate you restaurants based off of a recommendation system, dependent on input data of others.
            </p>
          </div>
          <div className="about-item flex flex-col lg:flex-row items-center mx-4 my-4">
            <img src={aboutImage3} alt="About Image 3" className="w-full lg:w-1/4 h-auto rounded-lg shadow-md" />
            <p className="mt-4 lg:mt-0 lg:ml-4 text-lg text-neutral-500 text-left">
              Easily search for nearby restaurants and 
              find your next meal. The last step is quite simple, 
              just click on the restaurant you like and you will 
              be redirected to the restaurant's website to order whatever you like.

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;