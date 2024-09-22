import React from 'react'
import calender from '../assets/calender.gif'
import {Link } from "react-router-dom";

function Booking() {
  return (
    <div>
     <section className="ezy__featured33 light py-10 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
  <div className="container px-4 mx-auto">
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div className="w-full lg:w-1/3">
        <div className="bg-[#F8F988] dark:bg-slate-700 dark:bg-opacity-40 rounded-b-[200px] text-center h-full -mt-24 px-4">
          <img
            alt=""
            className="rounded mx-auto "
            src={calender}
            width="250"
          />

<p className="text-lg md:text-xl font-medium text-gray-800  p-6 rounded-lg font-sans max-w-2xl mx-auto leading-relaxed">
  Get the care you need, when you need it – book your hospital appointments online in seconds and skip the wait!
</p>
      <Link to="/FindDrs" 
        className="bg-[#C0EEE4] hover:bg-[#FFCAC8] text-black font-semibold py-3 px-6 rounded-lg transition duration-300 inline-block text-center"
      >
        Start Booking 
      </Link>
        </div>
        
      </div>
      <div className="w-full lg:w-2/3">
        <div className="ezy__featured32-wrapper xl:ml-6 w-full">
       
<p className='font-bold text-3xl -mt-12'>Ready to get started? Here's how you can easily book your appointment:</p>
          <div className="grid grid-cols-2 w-full">
            <div className="col-span-2 lg:col-span-1">
        
              <div className="relative p-4 md:p-10">
             


                <div className="h-16 w-16 bg-[#FF9E9E] dark:bg-slate-800 shadow-xl flex justify-center items-center text-blue-600 rounded-full text-3xl mb-6 mr-6">
                  <i className="fas fa-cannabis" />
                  1
                </div>

                <div>
                  <h4 className="text-2xl font-bold mb-4">
                  Search for Doctors
                  </h4>
                  <p className="opacity-70">
                  
                  Use our intuitive search feature to find healthcare providers based on your needs and availability. Browse through doctor profiles to view their specialties, ratings, and schedules.                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className="relative p-4 md:p-10">
                <div className="h-16 w-16 bg-[#FFCAC8] dark:bg-slate-800 shadow-xl flex justify-center items-center text-blue-600 rounded-full text-3xl mb-6 mr-6">
                  <i className="fas fa-random " />
                  2
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4">
                  Select a Time Slot
                  </h4>
                  <p className="opacity-70">
                  
                  Choose a convenient time slot from the available appointment options. Our system will show you real-time availability so you can book a slot that fits your schedule.                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className="relative p-4 md:p-10">
                <div className="h-16 w-16 bg-[#C0EEE4] dark:bg-slate-800 shadow-xl flex justify-center items-center text-blue-600 rounded-full text-3xl mb-6 mr-6">
                  <i className="fas fa-cannabis" />
                  3
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4">
                  Confirm Your Booking
                  </h4>
                  <p className="opacity-70">
                  
                  Review your appointment details and confirm your booking by clicking the "Confirm Appointment" button.                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className="relative p-4 md:p-10">
                <div className="h-16 w-16 bg-[#F8F988] dark:bg-slate-800 shadow-xl flex justify-center items-center text-blue-600 rounded-full text-3xl mb-6 mr-6">
                  <i className="fas fa-random" />
                  4
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4">
                  Attend Your Appointment
                  </h4>
                  <p className="opacity-70">
                  On the day of your appointment, visit the healthcare provider’s office. Enjoy a seamless experience with easy access to your appointment details through your online account.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Booking;