import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import Loading from "../Loading/Loading";

const HeroSection = () => {
    const {loading} = use(AuthContext)

    if(loading) return <Loading></Loading>;

  return (
    <section className=" bg-gradient-to-r from-[#008cff] to-[#3A7BD5] text-white mt-5">
      <div className="container  px-5 md:px-8 lg:px-12 py-16 md:py-20 lg:py-28 grid md:grid-cols-2 items-center">

        
        <div className="text-center md:text-left space-y-5 lg:space-y-6">
          
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Rent Your Perfect Ride
            <span className="block text-yellow-300">
              Anytime, Anywhere
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-md mx-auto md:mx-0">
            Find and rent top-quality cars at your convenience. 
            Fast, affordable, and reliable — RentWheels is ready for your next adventure.
          </p>

          {/* btn */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 pt-2">
            <Link to='/browseCars' className="px-8 py-3 bg-yellow-300 text-black font-extralight rounded-xl sm:rounded-2xl shadow-lg hover:opacity-90">
              Rent a Car
            </Link>

            <Link to='/browseCars' className="px-8 py-3 backdrop-blur-lg border border-gray-500 rounded-xl sm:rounded-2xl font-semibold 
            bg-gray-500 hover:bg-gray-600">
              Explore Cars
            </Link>
          </div>
        </div>

       
        <div className="mt-10 md:mt-0 flex justify-center md:justify-end">
          <img
            src="https://i.ibb.co.com/mVhPT2Tr/pngimg-com-audi-PNG1736.png"
            alt="Car"
            className="w-[85%] sm:w-[70%] md:w-[90%] lg:w-[420px] drop-shadow-2xl select-none hero-car-image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
