import React, { useState } from 'react';
import img from '../assets/20.jpg';
import AppointmentCalendar from '../pages/AppointmentCalendar'; // Import the AppointmentCalendar component

const TabButton = ({ active, onClick, children, icon }) => (
  <button
    className={`px-4 py-2 font-semibold transition-all duration-300 flex items-center ${
      active
        ? 'bg-white text-blue-600 border-b-2 border-blue-600'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{children}</span>
  </button>
);

const InputField = ({ label, id, type = 'text', value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState('records');
  const [patientName, setPatientName] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    // Handle form submission
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'records':
        return (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Patient Name"
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <div className="mb-4">
              <label htmlFor="treatmentPlan" className="block text-gray-700 text-sm font-bold mb-2">
                Treatment Plan
              </label>
              <textarea
                id="treatmentPlan"
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300">
              Save Record
            </button>
          </form>
        );
      case 'appointments':
        return (
          // Render the AppointmentCalendar component here
          <div className="mt-8">
            <AppointmentCalendar />
          </div>
        );
      case 'communication':
        return (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Patient Email"
              id="patientEmail"
              type="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
            />
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              />
            </div>
            <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300">
              Send Message
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-10 rounded-3xl shadow-lg">
      <div className="mb-8 p-6 text-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl">
        <img src={img} alt="Dr. Jane Smith" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Dr. Jane Smith</h1>
        <h2 className="text-2xl text-purple-700 mb-4">Pediatrician</h2>
        <p className="text-gray-600">Helping little stars shine bright and healthy!</p>
      </div>

      <div className="mb-6 flex justify-center bg-gray-100 rounded-full p-1">
        <TabButton 
          active={activeTab === 'records'} 
          onClick={() => setActiveTab('records')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          </svg>}
        >
          Records
        </TabButton>
        <TabButton 
          active={activeTab === 'appointments'} 
          onClick={() => setActiveTab('appointments')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 9V2H4v7H3v1h7V9z" />
          </svg>}
        >
          Appointments
        </TabButton>
        <TabButton 
          active={activeTab === 'communication'} 
          onClick={() => setActiveTab('communication')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3z" />
          </svg>}
        >
          Communication
        </TabButton>
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};

export default DoctorProfile;
