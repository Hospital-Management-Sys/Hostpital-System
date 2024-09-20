
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layouts/navbar'; // Adjust path as needed
import HomePage from './pages/home';
import Footer from './layouts/footer';
import FindDrs from './pages/FindDrs';
import Doctors from './pages/Doctors';
import Booking from './pages/Booking';
import Appointment from './pages/Appointment';
import AppointmentCalendar from './pages/AppointmentCalendar';


function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/FindDrs" element={<FindDrs />} />
        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/AppointmentCalendar" element={<AppointmentCalendar />} />

      </Routes>
      <Footer />
    </Router>
  );

}

export default App;


