import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { Edit } from 'lucide-react';

// Setup localizer for the calendar
const localizer = momentLocalizer(moment);

function AppointmentCalendar() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ start: null, end: null, is_available: true, schedule_id: 1 });
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });
  const [editingSlot, setEditingSlot] = useState(null);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/avahours');
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setAlertMessage({ type: 'error', message: 'Failed to fetch available slots. Please try again.' });
    }
  };

  const isOverlapping = (newStart, newEnd, currentSlotId = null) => {
    return availableSlots.some(slot =>
      slot.id !== currentSlotId && (
        moment(newStart).isBetween(slot.available_from, slot.available_to, null, '[]') ||
        moment(newEnd).isBetween(slot.available_from, slot.available_to, null, '[]') ||
        (moment(newStart).isSameOrBefore(slot.available_from) && moment(newEnd).isSameOrAfter(slot.available_to))
      )
    );
  };

  const handleAddOrUpdateSlot = async (e) => {
    e.preventDefault();
    if (newSlot.start && newSlot.end) {
      if (moment(newSlot.end).isSameOrBefore(newSlot.start)) {
        setAlertMessage({ type: 'error', message: 'End time must be after start time.' });
        return;
      }
      if (isOverlapping(newSlot.start, newSlot.end, editingSlot?.id)) {
        setAlertMessage({ type: 'error', message: 'This time slot overlaps with an existing slot.' });
        return;
      }

      const slotData = {
        available_from: newSlot.start.toISOString(),
        available_to: newSlot.end.toISOString(),
        is_available: newSlot.is_available,
        schedule_id: newSlot.schedule_id,
      };

      try {
        if (editingSlot) {
          await axios.put(`http://localhost:3000/api/avahours/update/${editingSlot.id}`, slotData);
          setAlertMessage({ type: 'success', message: 'Slot updated successfully!' });
        } else {
          await axios.post('http://localhost:3000/api/avahours', slotData);
          setAlertMessage({ type: 'success', message: 'New slot added successfully!' });
        }
        await fetchAvailableSlots();
        resetForm();
      } catch (error) {
        console.error('Error adding/updating available slot:', error);
        setAlertMessage({ type: 'error', message: 'Error adding/updating available slot. Please try again.' });
      }
    }
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
    }
  };

  const resetForm = () => {
    setNewSlot({ start: null, end: null, is_available: true, schedule_id: 1 });
    setEditingSlot(null);
  };

  return (
    <div className="mb-10 bg-gray-100 shadow-lg rounded-lg p-6 mx-28">
      <h3 className="text-2xl font-bold mb-6 text-indigo-700">
        {editingSlot ? 'Edit Available Time Slot' : 'Add Available Time Slot'}
      </h3>
      {alertMessage.message && (
        <div className={`p-4 mb-4 rounded-md ${alertMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {alertMessage.message}
        </div>
      )}
      <form className="flex flex-col space-y-4" onSubmit={handleAddOrUpdateSlot}>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <DatePicker
            selected={newSlot.start}
            onChange={(date) => setNewSlot({ ...newSlot, start: date })}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Start Date and Time"
            className="border border-indigo-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <DatePicker
            selected={newSlot.end}
            onChange={(date) => setNewSlot({ ...newSlot, end: date })}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="End Date and Time"
            className="border border-indigo-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out flex items-center"
            type="submit"
          >
            {editingSlot ? (
              <>
                <Edit className="mr-2" size={18} />
                Update Available Slot
              </>
            ) : (
              'Add Available Slot'
            )}
          </button>
          {editingSlot && (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md transition duration-300 ease-in-out"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-6 text-indigo-700">Available Slots</h3>
        <Calendar
          localizer={localizer}
          events={availableSlots.map(slot => ({
            title: 'Available ',
            start: new Date(slot.available_from),
            end: new Date(slot.available_to),
            id: slot.id,
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          defaultView="week"
          views={['month', 'week', 'day', 'agenda']}
          onSelectEvent={handleSelectEvent}
          className="bg-white p-4 rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}

export default AppointmentCalendar;