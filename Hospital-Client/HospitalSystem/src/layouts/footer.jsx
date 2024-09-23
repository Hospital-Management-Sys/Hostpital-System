import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import img from '../assets/3.gif'; // Update the path to your logo image if necessary

const Footer = () => {
  return (
    <footer className="relative bg-[#FF9E9E] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <img className="h-32 w-32 mb-4" src={img} alt="Hospital Logo" />
          <span className="text-white text-2xl font-bold mb-4">Sunny Kids</span>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-4 md:space-y-0">
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

      {/* Cloud-like top border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
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
    </footer>
  );
};

export default Footer;
