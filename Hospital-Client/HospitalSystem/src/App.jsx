
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Appointment from './pages/Appointment'



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layouts/navbar'; // Adjust path as needed
import HomePage from './pages/home';
import Footer from './layouts/footer';
import LoginForm from './components/loginForm'

function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<LoginForm/>}/>
        
      </Routes>
      <Footer />
    </Router>
  );

}

export default App;


