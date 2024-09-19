import React, { useState } from 'react';

const ServiceCard = ({ icon, title, description, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white shadow-lg p-6 transition-all duration-300 transform ${isHovered ? 'scale-105' : ''}`}
      style={{
        borderTop: `4px solid ${color}`,
        borderRadius: '80% 40% 90% 90% / 80% 70% 90% 70%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-16 h-16 mx-auto mb-4 ${isHovered ? 'animate-bounce' : ''}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FF9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: 'Pediatrics',
      description: "Expert care for all your child's health needs.",
      color: '#FF9E9E',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F8F988" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'Eye Care',
      description: "Keeping your child's vision bright and clear.",
      color: '#F8F988',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#C0EEE4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      ),
      title: 'Dental Care',
      description: "Helping kids smile brighter every day.",
      color: '#C0EEE4',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FF9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      ),
      title: 'Vaccinations',
      description: "Protecting your child's health for the future.",
      color: '#FF9E9E',
    },
  ];

  return (
    <section className="py-12 bg-white mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Super Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  text-center w-full">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
