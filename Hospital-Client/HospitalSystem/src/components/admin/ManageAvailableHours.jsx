import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const ManageAvailableHours = () => {
    const [availableHours, setAvailableHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAvailableHours = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/availablehours');
                setAvailableHours(response.data);
            } catch (err) {
                setError('Error fetching available hours');
            } finally {
                setLoading(false);
            }
        };

        fetchAvailableHours();
    }, []);

    if (loading) return <div className="text-center text-teal">Loading...</div>;
    if (error) return <div className="text-red text-center">{error}</div>;

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-56 p-5 pl-24">
                <h2 className="text-2xl font-bold mb-4 text-teal">Manage Available Hours</h2>
                <table className="min-w-full bg-white border border-teal">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Schedule ID</th>
                            <th className="border px-4 py-2">Available From</th>
                            <th className="border px-4 py-2">Available To</th>
                            <th className="border px-4 py-2">Is Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableHours.map(hour => (
                            <tr key={hour.schedule_id}>
                                <td className="border px-4 py-2">{hour.schedule_id}</td>
                                <td className="border px-4 py-2">{hour.available_from}</td>
                                <td className="border px-4 py-2">{hour.available_to}</td>
                                <td className="border px-4 py-2">{hour.is_available ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAvailableHours;
