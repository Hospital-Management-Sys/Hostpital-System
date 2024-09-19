import React from "react";
import { Link } from "react-router-dom"; 
import img from '../assets/3.png'; 

const Navbar = () => {
  return (
    <nav className="relative bg-[#FF9E9E] h-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center space-x-4">
            <img className="h-20 w-20" src={img} alt="Hospital Logo" />
            <span className="text-white text-2xl font-bold">Sunny Kids</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-[#FFCAC8] hover:text-white px-3 py-2 rounded-md text-m font-medium"
              >
                Home
              </Link>

              <Link
                to="/Doctors"
                className="text-white hover:bg-[#FFCAC8] hover:text-white px-3 py-2 rounded-md text-m font-medium"
              >
                Doctors
              </Link>

              <Link
                to="/about"
                className="text-white hover:bg-[#FFCAC8] hover:text-white px-3 py-2 rounded-md text-m font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:bg-[#FFCAC8] hover:text-white px-3 py-2 rounded-md text-m font-medium"
              >
                Contact
              </Link>
              
              
            </div>
          </div>
        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 500 80"
          preserveAspectRatio="none"
          className="relative block w-full h-8"
        >
          <path
            d="M0,40 Q200,100 500,50 T600,40 V80 H0 Z"
            fill="white"
          />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
