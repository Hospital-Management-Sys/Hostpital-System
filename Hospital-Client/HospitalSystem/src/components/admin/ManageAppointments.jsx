import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/appointments');
                setAppointments(response.data);
            } catch (err) {
                setError('Error fetching appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <div className="text-center text-teal">Loading...</div>;
    if (error) return <div className="text-red text-center">{error}</div>;

    return (
        <div className="flex pl-24">
            <AdminSidebar />
            <div className="ml-56 p-5">
                <h2 className="text-2xl font-bold mb-4 text-teal">Manage Appointments</h2>
                <table className="min-w-full bg-white border border-teal">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Appointment ID</th>
                            <th className="border px-4 py-2">Patient ID</th>
                            <th className="border px-4 py-2">Doctor ID</th>
                            <th className="border px-4 py-2">Appointment Date</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment.appointment_id}>
                                <td className="border px-4 py-2">{appointment.appointment_id}</td>
                                <td className="border px-4 py-2">{appointment.patient_id}</td>
                                <td className="border px-4 py-2">{appointment.doctor_id}</td>
                                <td className="border px-4 py-2">{new Date(appointment.appointment_date).toLocaleString()}</td>
                                <td className="border px-4 py-2">{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAppointments;
