import React, { useState } from 'react';
import img from '../assets/4.png'
import img2 from '../assets/5.png'
import img3 from '../assets/6.png'
import img4 from '../assets/7.png'
const TeamMember = ({ name, role, description, image }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 text-center">
    <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-[#FF9E9E]">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{name}</h3>
    <p className="text-[#FF9E9E] font-semibold mb-2">{role}</p>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = [
    {
      name: "Dr. Sarah Smile",
      role: "Pediatrician",
      description: "Dr. Sarah loves making children laugh and feel better!",
      image: img2
    },
    {
      name: "Nurse Bob Bandaid",
      role: "Friendly Nurse",
      description: "Nurse Bob knows all the best jokes to cheer you up!",
      image: img
    },
    {
      name: "Dr. Max Giggles",
      role: "Dentist",
      description: "Dr. Max makes taking care of your teeth super fun!",
      image: img3
    },
    {
      name: "Nurse Lily Lullaby",
      role: "Night Nurse",
      description: "Nurse Lily helps you have the sweetest dreams!",
      image: img4
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <section className="py-12 bg-white mt-16 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Meet Our Super Team!</h2>
        <div className="relative max-w-md mx-auto">
          <TeamMember {...teamMembers[currentIndex]} />
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full bg-[#FF9E9E] text-white rounded-full p-2 focus:outline-none hover:bg-[#F8F988] transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full bg-[#FF9E9E] text-white rounded-full p-2 focus:outline-none hover:bg-[#F8F988] transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 mx-1 rounded-full ${
                index === currentIndex ? 'bg-[#FF9E9E]' : 'bg-gray-300'
              }`}
            />
          ))}
          
        </div>
        <div className="container mx-auto px-4 text-center mt-10 border-[#F8F988]">
        <a
          href="#book-appointment"
          className="inline-block bg-[#C0EEE4] text-[#FF9E9E]  font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#FF9E9E] hover:text-white hover:scale-110 transition duration-300 ease-in-out"
        >
          Book an Appointment
        </a>
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;