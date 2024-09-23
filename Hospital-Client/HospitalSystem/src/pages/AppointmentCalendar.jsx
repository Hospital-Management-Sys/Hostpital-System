import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { Edit, X } from 'lucide-react';

// Setup localizer for the calendar
const localizer = momentLocalizer(moment);

// Custom Sweet Alert component
const SweetAlert = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white rounded-lg p-8 max-w-sm w-full m-4 relative ${type === 'success' ? 'border-green-500' : 'border-red-500'} border-t-4`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <p className={`text-xl font-semibold mb-4 ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {type === 'success' ? 'Success!' : 'Error!'}
        </p>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className={`mt-6 w-full py-2 px-4 rounded-full font-semibold text-white ${type === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Popup Form component
const PopupForm = ({ isOpen, onClose, newSlot, setNewSlot, editingSlot, handleAddOrUpdateSlot, resetForm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full m-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h3 className="text-3xl font-bold mb-6 text-[#96e4d3] text-center">
          {editingSlot ? 'Edit Available Time Slot' : 'Add Available Time Slot'}
        </h3>
        <form onSubmit={handleAddOrUpdateSlot} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date and Time</label>
              <DatePicker
                selected={newSlot.start}
                onChange={(date) => setNewSlot({ ...newSlot, start: date })}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select start date and time"
                className="border border-[#b7f1e4] rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#86d7c6] transition-all duration-300 ease-in-out hover:border-[#86d7c6]"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date and Time</label>
              <DatePicker
                selected={newSlot.end}
                onChange={(date) => setNewSlot({ ...newSlot, end: date })}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select end date and time"
                className="border border-[#b7f1e4] rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#86d7c6] transition-all duration-300 ease-in-out hover:border-[#86d7c6]"
                required
              />
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className="bg-[#b7f1e4] hover:bg-[#86d7c6] text-black font-semibold px-8 py-3 rounded-full transition duration-300 ease-in-out flex items-center justify-center min-w-[200px] transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#86d7c6] focus:ring-opacity-50"
              type="submit"
            >
              {editingSlot ? (
                <>
                  <Edit className="mr-2" size={18} />
                  <span>Update Slot</span>
                </>
              ) : (
                'Add Slot'
              )}
            </button>
            {editingSlot && (
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-full transition duration-300 ease-in-out flex items-center justify-center min-w-[200px] transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

function AppointmentCalendar() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ start: null, end: null, is_available: true, schedule_id: 1 });
  const [sweetAlert, setSweetAlert] = useState({ show: false, message: '', type: '' });
  const [editingSlot, setEditingSlot] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/avahours/get');
      const availableHours = response.data.availableHours;
      if (Array.isArray(availableHours)) {
        const slots = availableHours.map(slot => ({
          id: slot.schedule_id,
          available_from: slot.available_from,
          available_to: slot.available_to,
        }));
        setAvailableSlots(slots);
      } else {
        console.error('Expected an array but got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      showSweetAlert('Failed to fetch available slots', 'error');
    }
  };

  const isOverlapping = (newStart, newEnd, currentSlotId = null) => {
    return availableSlots.some(slot => {
      if (currentSlotId && slot.id === currentSlotId) return false;
      const slotStart = new Date(slot.available_from);
      const slotEnd = new Date(slot.available_to);
      return (
        (newStart >= slotStart && newStart < slotEnd) ||
        (newEnd > slotStart && newEnd <= slotEnd) ||
        (newStart <= slotStart && newEnd >= slotEnd)
      );
    });
  };

  const handleAddOrUpdateSlot = async (e) => {
    e.preventDefault();
    if (isOverlapping(newSlot.start, newSlot.end, editingSlot?.id)) {
      showSweetAlert('The new slot overlaps with an existing slot', 'error');
      return;
    }

    try {
      if (editingSlot) {
        await axios.put(`http://localhost:3000/api/avahours/${editingSlot.id}`, {
          available_from: newSlot.start.toISOString(),
          available_to: newSlot.end.toISOString(),
          is_available: newSlot.is_available,
          schedule_id: newSlot.schedule_id,
        });
        showSweetAlert('Slot updated successfully', 'success');
      } else {
        await axios.post('http://localhost:3000/api/avahours/', {
          available_from: newSlot.start.toISOString(),
          available_to: newSlot.end.toISOString(),
          is_available: newSlot.is_available,
          schedule_id: newSlot.schedule_id,
        });
        showSweetAlert('Slot added successfully', 'success');
      }
      fetchAvailableSlots();
      resetForm();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        showSweetAlert(error.response.data.message, 'error');
      } else {
        console.error('Error adding/updating slot:', error);
        showSweetAlert('Failed to add/update slot', 'error');
      }
    }
    setIsPopupOpen(false);
  };

  const handleSelectEvent = (event) => {
    const selectedSlot = availableSlots.find(slot => slot.id === event.id);
    if (selectedSlot) {
      setNewSlot({
        start: new Date(selectedSlot.available_from),
        end: new Date(selectedSlot.available_to),
        is_available: selectedSlot.is_available,
        schedule_id: selectedSlot.schedule_id,
      });
      setEditingSlot(selectedSlot);
      setIsPopupOpen(true);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewSlot({ start, end, is_available: true, schedule_id: 1 });
    setEditingSlot(null);
    setIsPopupOpen(true);
  };

  const resetForm = () => {
    setNewSlot({ start: null, end: null, is_available: true, schedule_id: 1 });
    setEditingSlot(null);
    setIsPopupOpen(false);
  };

  const showSweetAlert = (message, type) => {
    setSweetAlert({ show: true, message, type });
    setTimeout(() => setSweetAlert({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={availableSlots}
        startAccessor="available_from"
        endAccessor="available_to"
        style={{ height: 600, margin: '50px' }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />
      {isPopupOpen && (
        <PopupForm
          isOpen={isPopupOpen}
          onClose={resetForm}
          newSlot={newSlot}
          setNewSlot={setNewSlot}
          editingSlot={editingSlot}
          handleAddOrUpdateSlot={handleAddOrUpdateSlot}
          resetForm={resetForm}
        />
      )}
      {sweetAlert.show && (
        <SweetAlert
          message={sweetAlert.message}
          type={sweetAlert.type}
          onClose={() => setSweetAlert({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
}

export default AppointmentCalendar;