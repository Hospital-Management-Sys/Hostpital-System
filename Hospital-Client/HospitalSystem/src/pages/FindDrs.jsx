import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import doctors2 from '../assets/doctors2.jpg';
import DropDown from '../components/DropDown';

function FindDrs() {
  const navigate = useNavigate(); // Create navigate function

  // Function to handle dropdown value change
  const handleSpecializationSelect = (selectedValue) => {
    // Navigate to Doctors page with query parameter
    navigate(`/doctors?specialization=${selectedValue}`);
  };

  return (
    <div>
      <div key="1" className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
              Your health, your choice, now find a 
              {' '}
              <span className="text-[#FF9E9E]">doctor!</span>
            </h1>
            <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
              Hand-picked professionals and expertly crafted components, designed for any kind of entrepreneur.
            </p>
            
            <form className="flex items-center max-w-lg ml-[4px] mt-[12px]">
              <label className="sr-only" htmlFor="voice-search">Search</label>
              <div className="relative w-96">
               
                {/* Pass handleSpecializationSelect as prop to DropDown */}
                <DropDown onSelect={handleSpecializationSelect} />
              </div>
              
            </form>
          </div>
          <div className="relative ms-4">
            <img alt="Hero Image" className="w-full h-[700px] rounded-md" src={doctors2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindDrs;