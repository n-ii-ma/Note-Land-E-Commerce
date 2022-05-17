import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosApiPrivate } from "../../config/axiosConfig";

// Register
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ first_name, last_name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.post("/auth/register", {
        first_name,
        last_name,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user", response.data.user.user_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.post("/auth/logout");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    isRegistered: false,
    isLoggedIn: false,
    isLoggedOut: false,
    isLoading: false,
    hasError: false,
    errorMessage: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRegistered = true;
        state.isLoggedIn = false;
        state.isLoggedOut = false;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRegistered = true;
        state.isLoggedIn = true;
        state.isLoggedOut = false;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRegistered = false;
        state.isLoggedIn = false;
        state.isLoggedOut = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      });
  },
});

// Selectors
export const selectUser = (state) => state.users.user;
export const selectRegisteredState = (state) => state.users.isRegistered;
export const selectLoggedInState = (state) => state.users.isLoggedIn;
export const selectLoggedOutState = (state) => state.users.isLoggedOut;
export const selectLoadingUsers = (state) => state.users.isLoading;
export const selectErrorUsers = (state) => state.users.hasError;
export const selectErrorMessageUsers = (state) => state.users.errorMessage;

// Reducer
export default usersSlice.reducer;
