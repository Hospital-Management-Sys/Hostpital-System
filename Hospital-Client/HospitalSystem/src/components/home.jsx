import React, { useState } from 'react';
import img from '../assets/2.png'
const CheerfulHeroSection = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const icons = [
    { 
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
      color: '#F8F988',
      text: 'Bright Days'
    },
    {
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
      color: '#C0EEE4',
      text: 'Soft Care'
    },
    {
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      color: '#FF9E9E',
      text: 'Star Treatment'
    },
    {
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      color: '#FF9E9E',
      text: 'Loving Support'
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-20 overflow-hidden relative">
      <div className="container mx-auto flex flex-col md:flex-row items-center my-8 md:my-12 relative z-10">
        <div className="flex flex-col w-full lg:w-1/2 justify-center items-start p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#C0EEE4] mb-4 animate-bounce">
            Sunny Kids Hospital
          </h1>
          <h2 className="text-2xl md:text-4xl leading-relaxed md:leading-snug mb-6 text-[#F8F988] animate-pulse">
            Where Every Smile Matters!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Join us for a magical journey of health, happiness, and lots of fun! Our friendly doctors and nurses are here to make you feel super-duper better.
          </p>
          <a
            href="#"
            className="bg-[#F8F988] hover:bg-[#C0EEE4] text-white hover:text-[#FF9E9E] rounded-full shadow-lg hover:shadow-xl py-3 px-8 text-lg transition duration-300 transform hover:scale-110"
          >
            Start Your Adventure!
          </a>
        </div>
        <div className="w-full lg:w-1/2 p-8 flex justify-center items-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#F8F988] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#FF9E9E] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#C0EEE4] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-2xl transform hover:scale-105 transition duration-300">
              {/* <img className="rounded-lg shadow-lg" src={img} alt="Happy children at the hospital" /> */}
              <div className="mt-4 flex justify-around">
                {icons.map(({ svg, color, text }, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center transition-all duration-300 transform hover:scale-110"
                    onMouseEnter={() => setHoveredIcon(index)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div 
                      className={`w-10 h-10 ${hoveredIcon === index ? 'animate-bounce' : ''}`}
                      style={{ color: color }}
                    >
                      {svg}
                    </div>
                    <span className="text-xs mt-2 text-gray-600">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-float"
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

export default CheerfulHeroSection;