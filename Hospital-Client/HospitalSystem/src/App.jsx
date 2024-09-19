import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layouts/navbar'; // Adjust path as needed
import HomePage from './pages/home';
import Footer from './layouts/footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       " <Route path="/" element={<HomePage />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;



