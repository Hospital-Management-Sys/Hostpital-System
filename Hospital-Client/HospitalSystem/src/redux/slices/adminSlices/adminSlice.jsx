import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin } from '../../thunks/adminThunks/adminThunk';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isLoggedIn: false,
        adminId: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.adminId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoggedIn = true;
                state.adminId = action.payload;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
