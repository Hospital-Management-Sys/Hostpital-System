import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../slices/adminSlices/adminSlice';

const store = configureStore({
    reducer: {
        admin: adminReducer,
    },
});

export default store;
