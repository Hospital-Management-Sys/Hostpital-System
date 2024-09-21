import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const ManagePayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/payments');
                setPayments(response.data);
            } catch (err) {
                setError('Error fetching payments');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) return <div className="text-center text-teal">Loading...</div>;
    if (error) return <div className="text-red text-center">{error}</div>;

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-56 p-5 pl-24">
                <h2 className="text-2xl font-bold mb-4 text-teal">Manage Payments</h2>
                <table className="min-w-full bg-white border border-teal">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Payment ID</th>
                            <th className="border px-4 py-2">Patient ID</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.payment_id}>
                                <td className="border px-4 py-2">{payment.payment_id}</td>
                                <td className="border px-4 py-2">{payment.patient_id}</td>
                                <td className="border px-4 py-2">${Number(payment.amount).toFixed(2)}</td>
                                <td className="border px-4 py-2">{payment.payment_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagePayments;
