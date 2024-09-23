import { createSlice } from "@reduxjs/toolkit";
import { getUserData, updateUserData } from "../../thunks/authThunks/authThunk";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {}, status: "idle", error: "" },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "Success";
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateUserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.status = "Success";
        state.user = action.payload.user;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
