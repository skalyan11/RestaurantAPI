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
      </div>
    );
  };
  
  export default HeroSection;