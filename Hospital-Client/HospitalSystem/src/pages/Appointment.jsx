import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';

// Initialize moment localizer
const localizer = momentLocalizer(moment);

// Custom Sweet Alert component
const SweetAlert = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full m-4 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Booking</h2>
      <p className="mb-4 text-gray-600">{message}</p>
      <div className="flex justify-end space-x-4">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200">
          Confirm
        </button>
      </div>
    </div>
  </div>
);

const Appointment = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [doctorId] = useState(1); // Replace with dynamic doctor ID
  const [showSweetAlert, setShowSweetAlert] = useState(false);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/avahours/get');
      const formattedSlots = response.data.availableHours.map(slot => ({
        id: slot.id,
        title: slot.is_available ? 'Available' : 'Booked',
        start: new Date(slot.available_from),
        end: new Date(slot.available_to),
      }));
      setAvailableSlots(formattedSlots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setErrorMessage('Error fetching available slots. Please try again.');
    }
  };

  const handleSelectSlot = (slot) => {
    if (slot.title === 'Available') {
      setSelectedSlot(slot);
      setShowSweetAlert(true);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) return;

    const appointmentData = {
      patientId: 3, // Replace with actual patient ID
      doctorId,
      appointmentDate: moment(selectedSlot.start).format('YYYY-MM-DD HH:mm:ss'),
      notes: '',
    };

    try {
      await axios.post('http://localhost:3000/api/avahours/book', appointmentData);
      // Update only the selected slot to 'Booked'
      setAvailableSlots(prevSlots =>
        prevSlots.map(s =>
          s.id === selectedSlot.id ? { ...s, title: 'Booked' } : s
        )
      );
      setSelectedSlot(null);
      setShowSweetAlert(false);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage(error.response ? error.response.data.message : 'Error booking appointment. Please try again.');
    }
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.title === 'Available' ? '#4CAF50' : '#F44336',
      color: 'white',
      borderRadius: '4px',
      padding: '10px',
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-black mb-8 text-center">Book Your Appointment</h1>
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 max-w-6xl mx-auto">
        <Calendar
          localizer={localizer}
          events={availableSlots}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectSlot}
          views={['month']}
          className="rounded-lg overflow-hidden"
        />
      </div>

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {errorMessage}
        </div>
      )}

      {showSweetAlert && (
        <SweetAlert
          message={`Confirm booking for ${moment(selectedSlot.start).format('MMMM D, YYYY [at] h:mm A')}?`}
          onConfirm={handleBookAppointment}
          onCancel={() => {
            setSelectedSlot(null);
            setShowSweetAlert(false);
          }}
        />
      )}
    </div>
  );
};

export default Appointment;