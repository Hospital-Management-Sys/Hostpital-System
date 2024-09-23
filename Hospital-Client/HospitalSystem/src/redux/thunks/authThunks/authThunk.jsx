import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

const registerUser = createAsyncThunk("user/registerUser", async (userData) => {
  try {
    const response = await axios.post("/api/users/registerPatient", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return { role: response.data.role, statusCode: response.status };
  } catch (e) {
    console.log(e);
  }
});

const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    try {
      const response = await axios.post(
        "/api/users/loginUser",
        userCredentials
      );
      console.log(response.status);

      return { role: response.data.role, statusCode: response.status };
    } catch (e) {
      console.log(e);
    }
  }
);

const getUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await axios.get("/api/users/getUserData");
  return response.data;
});

const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (userData) => {
    const response = await axios.put("/api/users/updateUserData", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data
  }
  
);

export { registerUser, loginUser, getUserData,updateUserData };
