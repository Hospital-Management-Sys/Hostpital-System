// import React from 'react';
// import dr1 from '../assets/dr1.jpg'

// function Appointment() {
 
//     return (
//       <div className='w-full'>
//         <div className="w-full">
//           <div className="relative border-8 border-grayRoot mx-auto mt-20 mb-3 max-w-screen-lg overflow-hidden rounded-t-xl bg-emerald-200/60 py-32 text-center shadow-xl shadow-gray-300">
//             <h1 className="mt-2 ml-8 px-8 text-3xl font-bold text-white md:text-5xl">
//               Book An Appointment
//             </h1>
//             <img
//               className="absolute top-0 left-0 -z-10 w-[260px] h-[340px] object-cover"
//               src={dr1}
//               alt="Book Now"
//             />
//           </div>

//           <div className="mx-auto grid max-w-screen-lg px-6 pb-20 border-8 border-grayRoot">
//             <form>
//               <div>
//                 <p className="font-serif text-xl font-bold text-blue-900 mt-12">
//                   Select a service
//                 </p>
//                 <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
//                   <div className="relative bg-grayRoot">
//                     <input
//                       className="peer absolute opacity-0"
//                       id="radio_online"
//                       type="radio"
//                       name="service_type"
//                       value="Online"
//                     />
//                     <label
//                       className="flex h-full cursor-pointer flex-col items-center justify-center rounded-lg p-6 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-emerald-500 hover:text-white peer-checked:bg-emerald-600 peer-checked:text-white"
//                       htmlFor="radio_online"
//                     >
//                       <span className="mt-2 font-medium">On-Line</span>
//                     </label>
//                   </div>

//                   <div className="relative bg-grayRoot">
//                     <input
//                       className="peer absolute opacity-0"
//                       id="radio_onsite"
//                       type="radio"
//                       name="service_type"
//                       value="Onsite"
//                     />
//                     <label
//                       className="flex h-full cursor-pointer flex-col items-center justify-center rounded-lg p-6 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-emerald-500 hover:text-white peer-checked:bg-emerald-600 peer-checked:text-white"
//                       htmlFor="radio_onsite"
//                     >
//                       <span className="mt-2 font-medium text-emerald-900 peer-checked:text-white">
//                         On-Site
//                       </span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <p className="mt-8 font-serif text-xl font-bold text-blue-900">
//                   Select a date
//                 </p>
//                 <div className="relative mt-4 w-56">
//                   <input
//                     type="date"
//                     className="block w-full rounded-lg border p-2.5 text-emerald-800"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <p className="mt-8 font-serif text-xl font-bold text-blue-900">
//                   Select a time
//                 </p>
//                 <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
//                   <button
//                     type="button"
//                     className="rounded-lg px-4 py-2 font-medium bg-emerald-100 text-emerald-900"
//                   >
//                     12:00
//                   </button>
//                   <button
//                     type="button"
//                     className="rounded-lg px-4 py-2 font-medium bg-emerald-100 text-emerald-900"
//                   >
//                     14:00
//                   </button>
//                   <button
//                     type="button"
//                     className="rounded-lg px-4 py-2 font-medium bg-emerald-100 text-emerald-900"
//                   >
//                     09:00
//                   </button>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-[25%] bg-greenRoot border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-greenRoot hover:text-white mt-3"
//               >
//                 Book Now
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }


import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

// Custom Sweet Alert component
const SweetAlert = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full m-4 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Booking</h2>
      <p className="mb-4 text-gray-600">{message}</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

function Appointment() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [doctorId] = useState(1);
  const [status,setState]=useState('');

  const [showSweetAlert, setShowSweetAlert] = useState(false);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/avahours/getForUser');
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
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

    try {
      const appointmentData = {
        patient_id: 6,
        doctor_id: doctorId,
        appointment_date: moment(selectedSlot.start).format('YYYY-MM-DD HH:mm:ss'),
        status: status,
      };

      const response = await axios.post('http://localhost:3000/api/avahours/book', appointmentData);
      console.log(response.data);
      
      setAvailableSlots(prevSlots => 
        prevSlots.map(s => 
          s.id === selectedSlot.id ? { ...s, title: 'Booked' ,} : s
        )
      );

      setSelectedSlot(null);
      setErrorMessage('');
      setShowSweetAlert(false);
      setState("Booked");
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      setErrorMessage('Error booking appointment. Please try again.');
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
}

export default Appointment;   
