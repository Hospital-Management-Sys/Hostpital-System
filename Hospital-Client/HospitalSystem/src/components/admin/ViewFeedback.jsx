import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const ViewFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/feedback');
                setFeedbacks(response.data);
            } catch (err) {
                setError('Error fetching feedback');
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) return <div className="text-center text-teal">Loading...</div>;
    if (error) return <div className="text-red text-center">{error}</div>;

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-56 p-5 pl-24">
                <h2 className="text-2xl font-bold mb-4 text-teal">View Feedback</h2>
                <table className="min-w-full bg-white border border-teal">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Feedback ID</th>
                            <th className="border px-4 py-2">Patient ID</th>
                            <th className="border px-4 py-2">Doctor ID</th>
                            <th className="border px-4 py-2">Rating</th>
                            <th className="border px-4 py-2">Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(feedback => (
                            <tr key={feedback.feedback_id}>
                                <td className="border px-4 py-2">{feedback.feedback_id}</td>
                                <td className="border px-4 py-2">{feedback.patient_id}</td>
                                <td className="border px-4 py-2">{feedback.doctor_id}</td>
                                <td className="border px-4 py-2">{feedback.rating}</td>
                                <td className="border px-4 py-2">{feedback.feedback_text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewFeedback;
