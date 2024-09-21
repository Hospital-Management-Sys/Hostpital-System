import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';

const AdminDashboard = () => {
    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const [usersRes, patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/users'),         
                    axios.get('http://localhost:5000/api/patients'),      
                    axios.get('http://localhost:5000/api/doctors'),       
                    axios.get('http://localhost:5000/api/appointments'),   
                ]);
                
                setStatistics({
                    totalUsers: usersRes.data.length,          // Count users
                    totalPatients: patientsRes.data.length,    // Count patients
                    totalDoctors: doctorsRes.data.length,      // Count doctors
                    totalAppointments: appointmentsRes.data.length, // Count appointments
                });
            } catch (error) {
                console.error('Error fetching statistics', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <div className="ml-56 p-5 pl-24">
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-yellow p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <h3 className="text-lg font-bold">Total Users</h3>
                        <p className="text-2xl font-semibold">{statistics.totalUsers}</p>
                    </div>
                    <div className="bg-teal p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <h3 className="text-lg font-bold">Total Patients</h3>
                        <p className="text-2xl font-semibold">{statistics.totalPatients}</p>
                    </div>
                    <div className="bg-coral p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <h3 className="text-lg font-bold">Total Doctors</h3>
                        <p className="text-2xl font-semibold">{statistics.totalDoctors}</p>
                    </div>
                    <div className="bg-red p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <h3 className="text-lg font-bold">Total Appointments</h3>
                        <p className="text-2xl font-semibold">{statistics.totalAppointments}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
