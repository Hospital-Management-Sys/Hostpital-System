import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "../slices/recordSlice";
import adminReducer from "../slices/adminSlices/adminSlice";
import authReducer from "../slices/authSlice/authSlice";

const store = configureStore({

  reducer: {
    admin: adminReducer,
    records: recordReducer,
    auth: authReducer,
  },
});

export default store;
