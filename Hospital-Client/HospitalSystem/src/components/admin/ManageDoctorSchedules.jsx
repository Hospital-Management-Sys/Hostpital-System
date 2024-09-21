import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const ManageDoctorSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctorschedules');
                setSchedules(response.data);
            } catch (err) {
                setError('Error fetching schedules');
            } finally {
                setLoading(false);
            }
        };

        fetchSchedules();
    }, []);

    if (loading) return <div className="text-center text-teal">Loading...</div>;
    if (error) return <div className="text-red text-center">{error}</div>;

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-56 p-5 pl-24">
                <h2 className="text-2xl font-bold mb-4 text-teal">Manage Doctor Schedules</h2>
                <table className="min-w-full bg-white border border-teal">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Schedule ID</th>
                            <th className="border px-4 py-2">Doctor ID</th>
                            <th className="border px-4 py-2">Work Days</th>
                            <th className="border px-4 py-2">Available Times</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map(schedule => (
                            <tr key={schedule.schedule_id}>
                                <td className="border px-4 py-2">{schedule.schedule_id}</td>
                                <td className="border px-4 py-2">{schedule.doctor_id}</td>
                                <td className="border px-4 py-2">{schedule.work_days}</td>
                                <td className="border px-4 py-2">{schedule.availableTimesCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctorSchedules;
