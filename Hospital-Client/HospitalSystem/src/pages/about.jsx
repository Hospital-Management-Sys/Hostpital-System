import React from 'react';
import img from '../assets/6.png'
import img2 from '../assets/21.png'
const Icon = ({ name }) => {
  const icons = {
    Smile: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ),
    Users: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    Heart: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    ),
    Star: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
  };

  return icons[name] || null;
};

const AboutUsSection = () => {
  const missionPoints = [
    { icon: 'Smile', text: "Crafting user-friendly interfaces for children's healthcare", color: "#FF9E9E" },
    { icon: 'Users', text: "Collaborating closely with medical professionals", color: "#F8F988" },
    { icon: 'Heart', text: "Ensuring data privacy and security for young patients", color: "#C0EEE4" },
    { icon: 'Star', text: "Innovating in pediatric healthcare technology", color: "#FF9E9E" },
  ];

  const teamMembers = [
    { name: "Noor Atallah", role: "Scrum Master", superpower: "Sprint Speeder", color: "#FF9E9E" },
    { name: "Basil Abushihab", role: "QA Engineer", superpower: "Bug Buster", color: "#F8F988" },
    { name: "Forat Thalji", role: "Product Owner", superpower: "Code Conjurer", color: "#C0EEE4" },
    { name: "Mohamad Ramadan Hasoun", role: "Developer", superpower: "Function Fashioner", color: "#FF9E9E" },
    { name: "Abdallah Dabash", role: "Developer", superpower: "Database Dynamo", color: "#F8F988" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">About Our Super Dev Team</h1>
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src={img}
              alt="Our development team in action" 
              className="rounded-lg shadow-lg"
              style={{
                borderRadius: '80% 40% 90% 90% / 80% 70% 90% 70%',
              }}
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
            Once upon a time, in a land not so far away, a group of passionate pediatricians came together with a 
            dream: to create a magical place where children could receive the best healthcare while having fun!
            </p>
            <p className="text-gray-600">
            And so, our super clinic was born! A place where stethoscopes transform into wands, and every checkup 
              is an adventure. We've been on this exciting journey for over a decade, growing and learning alongside 
              the wonderful families we serve.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg shadow-inner mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Super Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missionPoints.map((point, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4" style={{ color: point.color }}>
                  <Icon name={point.icon} />
                </div>
                <p className="text-gray-700">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Code Crusaders</h2>
          <p className="text-gray-600 mb-8">
            Our team of dedicated tech heroes is here to ensure every line of code contributes to better healthcare for children. 
            Each member brings unique superpowers to make our software special!
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="w-48">
                <div 
                  className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden"
                  style={{
                    background: member.color,
                  }}
                >
                  <img 
                    src={img2} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-gray-800">{member.name}</p>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-sm text-gray-500">Superpower: {member.superpower}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;