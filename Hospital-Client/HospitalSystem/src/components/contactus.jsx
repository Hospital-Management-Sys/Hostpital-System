import React, { useState, useEffect } from 'react';
import { Send, Sun, Cloud, Star, Music, Smile, Gift } from 'lucide-react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    favoriteColor: '#F8F988'
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const response = await axios.post('http://localhost:3000/api/contact/submit', formData);
      console.log('Form submitted successfully:', response.data);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', favoriteColor: '#F8F988' });
      setShowConfetti(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const icons = [
    { Icon: Sun, color: '#F8F988', text: 'Bright Days' },
    { Icon: Cloud, color: '#C0EEE4', text: 'Soft Care' },
    { Icon: Star, color: '#FF9E9E', text: 'Star Treatment' },
    { Icon: Music, color: '#9EE6FF', text: 'Happy Tunes' },
    { Icon: Smile, color: '#FFD700', text: 'Joyful Smiles' },
    { Icon: Gift, color: '#FF69B4', text: 'Special Surprises' },
  ];

  const inputClasses = `w-full px-4 py-3 rounded-full focus:outline-none transition duration-300 bg-white bg-opacity-50 border-2 focus:border-[${formData.favoriteColor}]`;

  return (
    <section className="bg-white py-12 sm:py-20 overflow-hidden relative">
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradientMove 5s ease infinite;
          }
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(1000px) rotate(720deg); }
          }
          .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: #f2fcfa;
            animation: confetti 3s linear forwards;
            animation-delay: ${Math.random() * 5}s;
            animation-duration: ${Math.random() * 3 + 2}s;
          }
        `}
      </style>
      <div className="container mx-auto max-w-lg relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffb1b1] to-[#d9f5ef] animate-gradient-move opacity-90"></div>
          <div className="relative z-10 p-8">
            <h2 className="text-4xl font-bold text-center text-[#4d5f5b] mb-6 animate-bounce">
              Send a Sunny Message!
            </h2>
            <p className="text-xl text-center text-[#F8F988] mb-8 animate-pulse">
              Where Every Message Brings a Smile!
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block font-bold mb-2" style={{ color: formData.favoriteColor }} htmlFor="name">Your Superhero Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  style={{ borderColor: formData.favoriteColor }}
                  required
                  placeholder="e.g. Captain Awesome"
                />
              </div>
              <div className="group">
                <label className="block font-bold mb-2" style={{ color: formData.favoriteColor }} htmlFor="email">Your Magic Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  style={{ borderColor: formData.favoriteColor }}
                  required
                  placeholder="superhero@sunnykids.com"
                />
              </div>
              <div className="group">
                <label className="block font-bold mb-2" style={{ color: formData.favoriteColor }} htmlFor="subject">Your Super Power</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={inputClasses}
                  style={{ borderColor: formData.favoriteColor }}
                  placeholder="e.g. Giggle Blast"
                />
              </div>
              <div className="group">
                <label className="block font-bold mb-2" style={{ color: formData.favoriteColor }} htmlFor="message">Your Magical Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} rounded-xl`}
                  style={{ borderColor: formData.favoriteColor }}
                  rows="4"
                  required
                  placeholder="Share your super awesome thoughts!"
                />
              </div>
              <div className="group">
                <label className="block font-bold mb-2" style={{ color: formData.favoriteColor }} htmlFor="favoriteColor">Your Favorite Color</label>
                <input
                  type="color"
                  name="favoriteColor"
                  value={formData.favoriteColor}
                  onChange={handleChange}
                  className="w-full h-10 rounded-full cursor-pointer"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full font-bold text-lg flex items-center justify-center group relative overflow-hidden text-white transition-all duration-300 transform hover:scale-110"
                style={{ backgroundColor: formData.favoriteColor }}
                disabled={submitStatus === 'submitting'}
              >
                <span className="relative z-10 flex items-center">
                  {submitStatus === 'submitting' ? 'Sending...' : 'Send Your Sunny Message!'}
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF9E9E] via-[#F8F988] to-[#C0EEE4] opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
            </form>
            {submitStatus === 'success' && (
              <div className="mt-6 text-center font-bold p-4 rounded-full bg-[#C0EEE4] bg-opacity-70 text-[#FF9E9E] animate-bounce">
                Your magical message has been sent to Sunny Kids Hospital!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-6 text-center font-bold p-4 rounded-full bg-[#FF9E9E] bg-opacity-70 text-white animate-bounce">
                Oops! Something went wrong. Please try again.
              </div>
            )}
            <div className="mt-8 flex flex-wrap justify-around">
              {icons.map(({ Icon, color, text }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center transition-all duration-300 transform hover:scale-110 mb-4"
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <div 
                    className={`w-10 h-10 ${hoveredIcon === index ? 'animate-bounce' : ''}`}
                    style={{ color: color }}
                  >
                    <Icon size={40} />
                  </div>
                  <span className="text-xs mt-2 text-gray-600">{text}</span>
                </div>
              ))} 
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
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
      {showConfetti && (
        [...Array(200)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
              backgroundColor: ['#F8F988', '#C0EEE4', '#FF9E9E', '#9EE6FF'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))
      )}
    </section>
  );
};

export default ContactForm;