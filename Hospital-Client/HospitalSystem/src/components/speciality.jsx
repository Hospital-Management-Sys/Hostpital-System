import React from "react";
import { Link } from "react-router-dom";
import img from '../assets/12.png';
import img2 from '../assets/13.png';
import img3 from '../assets/14.png';
import img4 from '../assets/6.png';

const specialties = [
  {
    title: "Pediatrics",
    description: "Comprehensive care for children from infancy to adolescence.",
    image: img4,
    link: "/pediatrics" // Add the link for each specialty
  },
  {
    title: "Eye Care",
    description: "Specialized care to ensure your child's vision stays sharp.",
    image: img,
    link: "/eye-care" // Add the link for each specialty
  },
  {
    title: "Dental Care",
    description: "Expert dental care to keep your child's smile bright.",
    image: img2,
    link: "/dental-care" // Add the link for each specialty
  },
  {
    title: "Vaccinations",
    description: "Protective vaccinations to keep your child healthy.",
    image: img3,
    link: "/vaccinations" // Add the link for each specialty
  }
];

const SpecialtyCard = ({ title, description, image, link }) => (
  <Link to= './doctors' className="bg-white rounded-lg shadow-lg overflow-hidden block">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2 text-[#FF9E9E]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

const FindBySpecialtySection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Find by Specialty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((specialty, index) => (
            <SpecialtyCard key={index} {...specialty} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindBySpecialtySection;
