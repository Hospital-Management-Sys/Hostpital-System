import React, { useState, useEffect } from 'react';
import img from '../assets/dr2.jpg';
import AppointmentCalendar from '../pages/AppointmentCalendar';
import axios from 'axios';

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
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [newRecord, setNewRecord] = useState({ diagnosis: '', treatment: '' });

  useEffect(() => {
    const doctorData = JSON.parse(sessionStorage.getItem("doctor"));
    if (doctorData) {
      setDoctorInfo(doctorData);
    }
  }, []);

  const fetchRecords = async () => {
    setError(null);
    try {
      const doctorId = doctorInfo.user_id;
      const response = await axios.get(`http://localhost:3000/api/${doctorId}/patient-records`, {
        params: { patientName },
      });
      setRecords(response.data.records);
    } catch (error) {
      console.error("Error fetching patient records:", error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'records') {
      await fetchRecords();
    }
  };

  const handleAddRecord = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/${doctorInfo.user_id}/records`, {
        patient_id: records[0]?.patient_id,
        diagnosis: newRecord.diagnosis,
        treatment: newRecord.treatment,
      });
      setRecords([...records, response.data.record]);
      setNewRecord({ diagnosis: '', treatment: '' });
    } catch (error) {
      console.error("Error adding record:", error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };
  const handleEditRecord = async (recordId) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/${doctorInfo.user_id}/records/${recordId}`, {
        diagnosis: editingRecord.diagnosis,
        treatment: editingRecord.treatment,
      });
      setRecords(records.map(record => record.record_id === recordId ? response.data.record : record));
      setEditingRecord(null);
    } catch (error) {
      console.error("Error editing record:", error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'records':
        return (
          <div>
            <form onSubmit={handleSubmit} className="mb-4">
              <InputField
                label="Patient Name"
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300">
                Get Records
              </button>
            </form>
            {records.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Patient Records:</h2>
                <ul>
                  {records.map((record) => (
                    <li key={record.record_id} className="mb-4 p-4 border rounded-lg">
                      {editingRecord && editingRecord.record_id === record.record_id ? (
                        <div>
                          <InputField
                            label="Diagnosis"
                            id={`diagnosis-${record.record_id}`}
                            value={editingRecord.diagnosis}
                            onChange={(e) => setEditingRecord({...editingRecord, diagnosis: e.target.value})}
                          />
                          <InputField
                            label="Treatment"
                            id={`treatment-${record.record_id}`}
                            value={editingRecord.treatment}
                            onChange={(e) => setEditingRecord({...editingRecord, treatment: e.target.value})}
                          />
                          <button onClick={() => handleEditRecord(record.record_id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-full mr-2">
                            Save
                          </button>
                          <button onClick={() => setEditingRecord(null)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full">
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                          <p><strong>Treatment:</strong> {record.treatment}</p>
                          <button onClick={() => setEditingRecord(record)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded-full mt-2">
                            Edit
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Add New Record</h3>
                  <InputField
                    label="Diagnosis"
                    id="new-diagnosis"
                    value={newRecord.diagnosis}
                    onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
                  />
                  <InputField
                    label="Treatment"
                    id="new-treatment"
                    value={newRecord.treatment}
                    onChange={(e) => setNewRecord({...newRecord, treatment: e.target.value})}
                  />
                  <button onClick={handleAddRecord} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                    Add Record
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'appointments':
        return (
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
    <div className="max-w-4xl mx-auto p-6 bg-white mt-10 rounded-3xl shadow-lg mb-10">
      <div className="mb-8 p-6 text-center bg-gradient-to-r from-[#ffb1b1] to-[#d9f5ef] rounded-2xl">
        {doctorInfo && (
          <>
            <img src={img} alt={doctorInfo.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
            <h1 className="text-4xl font-bold text-blue-800 mb-2">{doctorInfo.name}</h1>
            <h2 className="text-2xl text-purple-700 mb-4">{doctorInfo.specialization}</h2>
            <p className="text-gray-600">{doctorInfo.bio}</p>
          </>
        )}
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
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default DoctorProfile;