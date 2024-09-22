import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAdmin = createAsyncThunk('admin/login', async ({ name, password }) => {
    const response = await axios.post('http://localhost:5000/api/admin/login', { name, password });
    return response.data.adminId;
});
