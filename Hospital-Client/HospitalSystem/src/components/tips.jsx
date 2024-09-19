import React, { useState } from 'react';
import img from '../assets/8.png'
import img2 from '../assets/9.png'
import img3 from '../assets/10.png'
import img4 from '../assets/11.png'
const HealthTipCard = ({ tip, image, color }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 transform ${isFlipped ? 'scale-105' : ''}`}
      style={{ borderBottom: `4px solid ${color}` }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative h-48">
        <img src={image} alt={tip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h3 className="text-white text-xl font-bold text-center px-4">{tip.title}</h3>
        </div>
      </div>
      <div className={`p-4 h-48 overflow-y-auto ${isFlipped ? 'block' : 'hidden'}`}>
        <p className="text-gray-700">{tip.description}</p>
      </div>
    </div>
  );
};

const HealthTipsSection = () => {
  const healthTips = [
    {
      title: "Brush Your Teeth Twice a Day!",
      description: "Keep your smile bright by brushing your teeth for two minutes, twice a day. It's like giving your teeth a super-clean bath!",
      image: img3,
      color: "#FF9E9E"
    },
    {
      title: "Eat Your Veggies",
      description: "Vegetables are like superfoods for your body! They help you grow strong and give you energy to play all day long.",
      image: img,
      color: "#F8F988"
    },
    {
      title: "Wash Your Hands",
      description: "Washing your hands is like having a shield against germs. Remember to scrub for as long as it takes to sing 'Happy Birthday' twice!",
      image: img4,
      color: "#C0EEE4"
    },
    {
      title: "Get Moving!",
      description: "Exercise is like playtime for your whole body! Try to play and move around for at least an hour every day.",
      image: img2,
      color: "#FF9E9E"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Fun Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {healthTips.map((tip, index) => (
            <HealthTipCard key={index} tip={tip} image={tip.image} color={tip.color} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthTipsSection;