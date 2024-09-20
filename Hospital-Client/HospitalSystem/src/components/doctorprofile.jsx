import React, { useState } from 'react';
import img from '../assets/20.jpg'
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
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
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
          <form onSubmit={handleSubmit}>
            <InputField
              label="Appointment Date"
              id="appointmentDate"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <InputField
              label="Appointment Time"
              id="appointmentTime"
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300">
              Schedule Appointment
            </button>
          </form>
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
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>}
        >
          Records
        </TabButton>
        <TabButton 
          active={activeTab === 'appointments'} 
          onClick={() => setActiveTab('appointments')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>}
        >
          Appointments
        </TabButton>
        <TabButton 
          active={activeTab === 'communication'} 
          onClick={() => setActiveTab('communication')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>}
        >
          Messages
        </TabButton>
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-6 border-t-4 border-blue-500">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DoctorProfile;