import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [hoveredDoctor, setHoveredDoctor] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const specialization = queryParams.get('specialization');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const url = specialization 
          ? `http://localhost:3000/drs?specialization=${specialization}` 
          : 'http://localhost:3000/drs/all';
        const response = await axios.get(url);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [specialization]);

  const getRandomColor = () => {
    const colors = ['#F8F988', '#C0EEE4', '#FF9E9E'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const DoctorIcon = ({ color, specialty }) => {
    const icons = {
      default: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width="80" height="80">
          <circle cx="12" cy="8" r="5" />
          <path d="M3,21 c0-4.4,3.6-8,8-8h2c4.4,0,8,3.6,8,8" />
          <rect x="11" y="14" width="2" height="4" />
          <rect x="10" y="17" width="4" height="2" />
        </svg>
      ),
      pediatrician: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width="80" height="80">
          <circle cx="12" cy="8" r="5" />
          <path d="M3,21 c0-4.4,3.6-8,8-8h2c4.4,0,8,3.6,8,8" />
          <circle cx="9" cy="10" r="1" fill="#333" />
          <circle cx="15" cy="10" r="1" fill="#333" />
          <path d="M9,15 Q12,18 15,15" fill="none" stroke="#333" strokeWidth="0.5" />
        </svg>
      ),
      surgeon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width="80" height="80">
          <circle cx="12" cy="8" r="5" />
          <path d="M3,21 c0-4.4,3.6-8,8-8h2c4.4,0,8,3.6,8,8" />
          <rect x="10" y="14" width="4" height="2" fill="#333" />
          <line x1="8" y1="18" x2="16" y2="18" stroke="#333" strokeWidth="0.5" />
        </svg>
      ),
    };
    return icons[specialty] || icons.default;
  };

  return (
    <section className="bg-white py-12 sm:py-20 overflow-hidden relative">
      <div className="container mx-auto my-8 md:my-12 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-[#C0EEE4] mb-8 text-center animate-bounce">
          {specialization ? `Our ${specialization} Superheroes!` : 'Meet Our Medical Superheroes!'}
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="flex flex-col items-center rounded-2xl border-4 border-dashed border-[#C0EEE4] px-6 py-6 text-center w-72 bg-white shadow-lg transform transition duration-300 hover:scale-105 hover:rotate-1"
                onMouseEnter={() => setHoveredDoctor(index)}
                onMouseLeave={() => setHoveredDoctor(null)}
                style={{
                  animation: `float 3s ease-in-out ${index * 0.5}s infinite`,
                }}
              >
                <div className="mb-4 relative">
                  <div className="transform transition duration-300 hover:rotate-12">
                    <DoctorIcon color={getRandomColor()} specialty={doctor.specialty} />
                  </div>
                  {hoveredDoctor === index && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 rounded-full transition-opacity duration-300">
                      <p className="text-lg font-bold text-[#FF9E9E]">
                        {doctor.speciality}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-[#C0EEE4] mb-2">{doctor.name}</p>
                <p className="text-sm font-medium text-gray-500 mb-4">{doctor.title}</p>
                <div className="flex space-x-2 mb-4">
                  <div className="flex flex-col items-center rounded-xl bg-[#F8F988] px-3 py-1 transform transition duration-300 hover:scale-110">
                    <p className="text-xs font-medium text-gray-700">Magic Stickers</p>
                    <p className="text-lg font-bold text-[#FF9E9E]">{doctor.articles}</p>
                  </div>
                  <div className="flex flex-col items-center rounded-xl bg-[#C0EEE4] px-3 py-1 transform transition duration-300 hover:scale-110">
                    <p className="text-xs font-medium text-gray-700">Super High-Fives</p>
                    <p className="text-lg font-bold text-[#FF9E9E]">{doctor.papers}</p>
                  </div>
                </div>
                <Link 
                  to="/Appointment" 
                  className="w-full rounded-full bg-[#FF9E9E] px-4 py-2 font-bold text-white hover:bg-[#F8F988] hover:text-gray-800 transition duration-300 transform hover:scale-105 hover:rotate-1"
                >
                  Book a Magical Playdate!
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-2xl text-[#FF9E9E] animate-bounce">
              Oops! Our superheroes are on a secret mission{specialization && ` to save ${specialization}`}. They'll be back soon with special powers!
            </p>
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#C0EEE4] opacity-20 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Doctors;