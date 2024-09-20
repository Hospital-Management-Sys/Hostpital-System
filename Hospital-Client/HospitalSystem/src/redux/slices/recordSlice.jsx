import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Thunks for async actions

// Create a new medical record
export const createRecord = createAsyncThunk(
  'records/createRecord',
  async ({ doctorId, recordData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/doctors/${doctorId}/patient-records`, recordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all medical records for a doctor
export const getRecordsForDoctor = createAsyncThunk(
  'records/getRecordsForDoctor',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/doctors/${doctorId}/patient-records`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get medical records for a specific patient
export const getRecordsByPatientId = createAsyncThunk(
  'records/getRecordsByPatientId',
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/patient-records/${patientId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a specific medical record
export const updateRecord = createAsyncThunk(
  'records/updateRecord',
  async ({ recordId, recordData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/patient-records/${recordId}`, recordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for the slice
const initialState = {
  records: [],
  loading: false,
  error: null,
};

// Create the slice
const recordSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createRecord
      .addCase(createRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getRecordsForDoctor
      .addCase(getRecordsForDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecordsForDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(getRecordsForDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getRecordsByPatientId
      .addCase(getRecordsByPatientId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecordsByPatientId.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(getRecordsByPatientId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateRecord
      .addCase(updateRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.records.findIndex((record) => record.record_id === action.payload.record_id);
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer for the store
export default recordSlice.reducer;
