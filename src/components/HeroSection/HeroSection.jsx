import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#632EE3] to-[#9F62F2] text-white">
      <div className="container mx-auto px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-28 grid md:grid-cols-2 items-center">

        {/* ========== LEFT TEXT AREA ========== */}
        <div className="text-center md:text-left space-y-5 lg:space-y-6">
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Rent Your Perfect Ride
            <span className="block text-yellow-300">
              Anytime, Anywhere
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-md mx-auto md:mx-0">
            Find and rent top-quality cars at your convenience. 
            Fast, affordable, and reliable — RentWheels is ready for your next adventure.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 pt-2">
            <button className="px-6 py-3 bg-yellow-300 text-black font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:opacity-90">
              Rent a Car
            </button>

            <button className="px-6 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl sm:rounded-2xl font-semibold hover:bg-white/30">
              Explore Cars
            </button>
          </div>
        </div>

        {/* ========== RIGHT IMAGE AREA ========== */}
        <div className="mt-10 md:mt-0 flex justify-center md:justify-end">
          <img
            src="https://pngimg.com/d/audi_PNG1736.png"
            alt="Car"
            className="w-[85%] sm:w-[70%] md:w-[90%] lg:w-[420px] drop-shadow-2xl select-none"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
