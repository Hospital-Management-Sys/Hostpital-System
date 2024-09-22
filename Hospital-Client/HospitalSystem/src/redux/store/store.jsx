import { configureStore } from '@reduxjs/toolkit';
import recordReducer from '../slices/recordSlice';
import adminReducer from '../slices/adminSlices/adminSlice';

const store = configureStore({
    reducer: {
        admin: adminReducer,
       records: recordReducer,
    },


export default store;
