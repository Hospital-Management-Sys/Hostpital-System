import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // Clear any authentication tokens or user data here
        localStorage.removeItem('token'); // Example: Remove token from local storage
        navigate('/admin/AdminLogin'); // Redirect to login page
    };

    return (
        <div className={`fixed inset-y-0 left-0 bg-teal p-5 shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="flex justify-between items-center">
                <Link to="/admin/AdminDashboard" className="text-2xl font-bold mb-4 text-coral block">
                    Admin Dashboard
                </Link>
                <button onClick={toggleSidebar} className="md:hidden text-2xl">
                    &#9776; {/* Hamburger icon */}
                </button>
            </div>
            <ul className="list-none p-0">
                {[
                    { name: 'Manage Users', path: '/admin/ManageUsers' },
                    { name: 'Manage Patients', path: '/admin/ManagePatients' },
                    { name: 'Manage Doctors', path: '/admin/ManageDoctors' },
                    { name: 'Manage Appointments', path: '/admin/ManageAppointments' },
                    { name: 'View Feedback', path: '/admin/ViewFeedback' },
                    { name: 'Manage Payments', path: '/admin/ManagePayments' },
                    { name: 'Manage Available Hours', path: '/admin/ManageAvailableHours' },
                    { name: 'Manage Doctor Schedules', path: '/admin/ManageDoctorSchedules' },
                ].map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.path}
                            className="block p-2 mb-2 rounded text-gray-800 hover:bg-coral transition"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout} className="mt-5 w-full p-2 rounded text-black bg-coral hover:bg-red-700 transition">
                Logout
            </button>
        </div>
    );
};

export default AdminSidebar;
