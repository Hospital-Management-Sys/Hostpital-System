import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../redux/thunks/adminThunks/adminThunk';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginStatus = useSelector((state) => state.admin.status);
    const error = useSelector((state) => state.admin.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAdmin({ name, password }));
    };

    useEffect(() => {
        if (loginStatus === 'succeeded') {
            Swal.fire({
                title: 'Success!',
                text: 'Login successful!',
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then(() => {
                navigate('/admin/AdminDashboard'); 
            });
        } else if (loginStatus === 'failed' && error) {
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    }, [loginStatus, error, navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#C0EEE4] to-[#F8F988]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="mb-6 text-2xl font-bold text-center text-[#FF9E9E]">Admin Login</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full mb-4 p-3 border border-[#FFCAC8] rounded focus:outline-none focus:ring-2 focus:ring-[#FF9E9E] transition duration-200"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mb-6 p-3 border border-[#FFCAC8] rounded focus:outline-none focus:ring-2 focus:ring-[#FF9E9E] transition duration-200"
                    required
                />
                <button 
                    type="submit" 
                    className="w-full p-3 bg-[#FF9E9E] text-white rounded hover:bg-[#FFCAC8] transition duration-200"
                    disabled={loginStatus === 'loading'}
                >
                    {loginStatus === 'loading' ? 'Logging in...' : 'Login'}
                </button>
                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default AdminLogin;
