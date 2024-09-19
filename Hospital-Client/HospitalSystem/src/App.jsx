import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate here
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
// admin imports

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {/* Define your admin paths */}
                    <Route path="/admin/AdminLogin" element={<AdminLogin />} />
                    <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/admin/ManageUsers" element={<ManageUsers />} />
                    <Route path="/admin/ManagePatients" element={<ManagePatients />} />
                    <Route path="/admin/ManageDoctors" element={<ManageDoctors />} />
                    <Route path="/admin/ManageAppointments" element={<ManageAppointments />} />
                    <Route path="/admin/ViewFeedback" element={<ViewFeedback />} />
                    <Route path="/admin/ManagePayments" element={<ManagePayments />} />
                    <Route path="/admin/ManageAvailableHours" element={<ManageAvailableHours />} />
                    <Route path="/admin/ManageDoctorSchedules" element={<ManageDoctorSchedules />} />
                    {/* Redirect any unmatched paths to /admin/login */}
                    <Route path="/" element={<Navigate to="/admin/AdminLogin" />} />
                    {/* Add other routes as needed */}
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
