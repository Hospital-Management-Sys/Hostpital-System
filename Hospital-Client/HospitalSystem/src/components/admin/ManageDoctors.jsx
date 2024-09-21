import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar'; 

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({
        specialization: '',
        years_of_experience: '',
        contact_number: '',
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/doctors');
            setDoctors(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedDoctor) {
            // Update doctor
            try {
                await axios.put(`http://localhost:5000/doctors/${selectedDoctor.user_id}`, formData);
                fetchDoctors();
                setSelectedDoctor(null);
                setFormData({ specialization: '', years_of_experience: '', contact_number: '' });
            } catch (err) {
                setError(err.message);
            }
        } else {
            // Create new doctor
            try {
                await axios.post('http://localhost:5000/doctors', formData);
                fetchDoctors();
                setFormData({ specialization: '', years_of_experience: '', contact_number: '' });
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEdit = (doctor) => {
        setSelectedDoctor(doctor);
        setFormData({
            specialization: doctor.specialization,
            years_of_experience: doctor.years_of_experience,
            contact_number: doctor.contact_number,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/doctors/${id}`);
            fetchDoctors();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="text-teal">Loading...</div>;
    if (error) return <div className="text-red">{error}</div>;

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-56 p-5 pl-24">
                <h1 className="text-2xl font-bold text-teal mb-4">Manage Doctors</h1>
                <form onSubmit={handleSubmit} className="mb-4 p-4 border border-teal rounded bg-yellow">
                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className="p-2 border border-teal mb-2 w-full"
                        required
                    />
                    <input
                        type="number"
                        name="years_of_experience"
                        placeholder="Years of Experience"
                        value={formData.years_of_experience}
                        onChange={handleInputChange}
                        className="p-2 border border-teal mb-2 w-full"
                        required
                    />
                    <input
                        type="text"
                        name="contact_number"
                        placeholder="Contact Number"
                        value={formData.contact_number}
                        onChange={handleInputChange}
                        className="p-2 border border-teal mb-2 w-full"
                        required
                    />
                    <button type="submit" className="bg-teal text-white p-2 rounded hover:bg-coral">
                        {selectedDoctor ? 'Update Doctor' : 'Add Doctor'}
                    </button>
                    {selectedDoctor && (
                        <button 
                            type="button" 
                            onClick={() => setSelectedDoctor(null)} 
                            className="bg-red text-white p-2 rounded ml-2"
                        >
                            Cancel
                        </button>
                    )}
                </form>

                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Specialization</th>
                            <th className="border px-4 py-2">Experience</th>
                            <th className="border px-4 py-2">Contact</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.user_id}>
                                <td className="border px-4 py-2">{doctor.user_id}</td>
                                <td className="border px-4 py-2">{doctor.specialization}</td>
                                <td className="border px-4 py-2">{doctor.years_of_experience}</td>
                                <td className="border px-4 py-2">{doctor.contact_number}</td>
                                <td className="border px-4 py-2">
                                    <button 
                                        onClick={() => handleEdit(doctor)} 
                                        className="bg-yellow text-black p-1 rounded mr-1"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(doctor.user_id)} 
                                        className="bg-red text-white p-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;
