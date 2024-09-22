

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/store';
// admin imports
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard'; 
import ManageUsers from './components/admin/ManageUsers';
import ManagePatients from './components/admin/ManagePatients';
import ManageDoctors from './components/admin/ManageDoctors';
import ManageAppointments from './components/admin/ManageAppointments';
import ViewFeedback from './components/admin/ViewFeedback';
import ManagePayments from './components/admin/ManagePayments';
import ManageAvailableHours from './components/admin/ManageAvailableHours';
import ManageDoctorSchedules from './components/admin/ManageDoctorSchedules';
import Navbar from './layouts/navbar'; // Adjust path as needed
import HomePage from './pages/home';
import Footer from './layouts/footer';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import AppointmentCalendar from './pages/AppointmentCalendar';
import FindDrs from './pages/FindDrs';
import DoctorProfile from './components/doctorprofile'
import AboutUsSection from './pages/about'

// import ContactForm from './pages/contactUs';
import Booking from './pages/Booking'
// import Appointment from './pages/Appointment';
// import AppointmentCalendar from './pages/AppointmentCalendar';
import LoginForm from './components/loginForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './components/contactus';


const App = () => {
    return (
        <Provider store={store}>

        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/find-doctors" element={<FindDrs />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route path="/about" element={<AboutUsSection />} />
                <Route path="/contact-us" element={<ContactForm />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/appointment-calendar" element={<AppointmentCalendar />} />
                <Route path="/login" element={<LoginForm />} />

           
       
        


        
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/manage-users" element={<ManageUsers />} />
                <Route path="/admin/manage-patients" element={<ManagePatients />} />
                <Route path="/admin/manage-doctors" element={<ManageDoctors />} />
                <Route path="/admin/manage-appointments" element={<ManageAppointments />} />
                <Route path="/admin/view-feedback" element={<ViewFeedback />} />
                <Route path="/admin/manage-payments" element={<ManagePayments />} />
                <Route path="/admin/manage-available-hours" element={<ManageAvailableHours />} />
                <Route path="/admin/manage-doctor-schedules" element={<ManageDoctorSchedules />} />
            </Routes>
            <Footer />
        </Router>
    </Provider>
    );
};

export default App;


