
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Appointment from './pages/Appointment'
import Booking from './pages/Booking'


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layouts/navbar'; // Adjust path as needed
import HomePage from './pages/home';
import Footer from './layouts/footer';
import FindDrs from './pages/FindDrs';
import Doctors from './pages/Doctors';
import DoctorProfile from './components/doctorprofile'
import AboutUsSection from './pages/about'
function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/FindDrs" element={<FindDrs />} />
        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/doctorP" element={<DoctorProfile />} />
        <Route path="/about" element={<AboutUsSection />} />


      </Routes>
      <Footer />
    </Router>
  );

}

export default App;


