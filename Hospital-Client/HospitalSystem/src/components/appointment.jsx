import React from 'react';

const CallToActionSection = () => {
  return (
    <section className="py-16 relative overflow-hidden mb-16">
      {/* Inline CSS for Animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradientMove 5s ease infinite;
          }
        `}
      </style>

      {/* Animated Background with Brighter Colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff7f7] to-[#f2fcfa] animate-gradient-move opacity-90"></div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold text-black mb-6 transition duration-500 transform hover:scale-105">
          Ready to Take Care of Your Little One's Health?
        </h2>
        <p className="text-lg text-black mb-8 transition duration-500 transform hover:translate-y-1">
          Our friendly staff and expert doctors are here to ensure the best care for your child. Schedule an appointment today!
        </p>
        <a
          href="#book-appointment"
          className="inline-block bg-white text-[#FF9E9E] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#FF9E9E] hover:text-white hover:scale-110 transition duration-300 ease-in-out"
        >
          Book an Appointment
        </a>
      </div>

      
      <div className="absolute top-0 left-0 w-20 h-20 bg-[#FF9E9E] rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F8F988] rounded-full opacity-50 animate-bounce"></div>
    </section>
  );
};

export default CallToActionSection;
