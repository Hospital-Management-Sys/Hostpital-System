import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../thunks/authThunks/authThunk";
const auth = JSON.parse(sessionStorage.getItem("auth"));
const initialState = {
  role: auth || "",
  status: "idle",
  error: "",
  isLogin: true,
  statusCode: "",
  isLoggedIn: sessionStorage.getItem("isLoggedIn") || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.role = "";
      state.status = "idle";
      sessionStorage.setItem("auth", JSON.stringify({ role: "" }));
    },
    setLogin: (state) => {
      state.isLogin = !state.isLogin;
    },
    setLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statusCode = action.payload.statusCode;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.statusCode = action.payload.statusCode;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statusCode = action.payload.statusCode;
        state.role = action.payload.role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.statusCode = action.payload.statusCode;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

export const { logoutUser, setLogin, setLoggedIn } = authSlice.actions;
