import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

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

// Get user
export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.get(`/users/${id}`);
      const data = response.data;
      return {
        user_id: data.user_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        address: data.address,
        city: data.city,
        postal_code: data.postal_code,
        phone: data.phone,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update user's private info
export const updateUserPrivateInfo = createAsyncThunk(
  "user/updateUserPrivateInfo",
  async (
    { first_name, last_name, email, password, id },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosApiPrivate.put(`/users/credentials/${id}`, {
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

// Update user's address
export const updateUserAddress = createAsyncThunk(
  "user/updateUserAddress",
  async ({ address, city, postal_code, phone, id }, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.put(`/users/address/${id}`, {
        address,
        city,
        postal_code,
        phone,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state
const initialState = {
  user: {},
  oneUser: {},
  isRegistered: false,
  isLoggedIn: false,
  isLoggedOut: false,
  isLoading: false,
  isUpdated: false,
  hasError: false,
  userMessage: {},
  errorMessage: {},
  updateMessage: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearRegistered: (state) => {
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userMessage = action.payload;
        state.isRegistered = true;
        state.isLoggedIn = false;
        state.isLoggedOut = false;
        state.isLoading = false;
        state.isUpdated = false;
        state.hasError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userMessage = action.payload;
        state.isRegistered = true;
        state.isLoggedIn = true;
        state.isLoggedOut = false;
        state.isLoading = false;
        state.isUpdated = false;
        state.hasError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userMessage = action.payload;
        state.user = {};
        state.oneUser = {};
        state.updateMessage = {};
        state.isRegistered = false;
        state.isLoggedIn = false;
        state.isLoggedOut = true;
        state.isLoading = false;
        state.isUpdated = false;
        state.hasError = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.oneUser = action.payload;
        state.isRegistered = true;
        state.isLoggedIn = true;
        state.isLoggedOut = false;
        state.isLoading = false;
        state.isUpdated = false;
        state.hasError = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateUserPrivateInfo.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
        state.hasError = false;
        state.userMessage = {};
        state.updateMessage = {};
      })
      .addCase(updateUserPrivateInfo.fulfilled, (state, action) => {
        state.updateMessage = action.payload;
        state.isRegistered = true;
        state.isLoggedIn = true;
        state.isLoggedOut = false;
        state.isLoading = false;
        state.isUpdated = true;
        state.hasError = false;
      })
      .addCase(updateUserPrivateInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateUserAddress.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
        state.hasError = false;
        state.userMessage = {};
        state.updateMessage = {};
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.updateMessage = action.payload;
        state.isRegistered = true;
        state.isLoggedIn = true;
        state.isLoggedOut = false;
        state.isLoading = false;
        state.isUpdated = true;
        state.hasError = false;
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      })
      // Purge redux-persist state after logout
      .addCase(PURGE, () => initialState);
  },
});

// Selectors
export const selectUser = (state) => state.users.user;
export const selectUserMessage = (state) => state.users.userMessage;
export const selectOneUser = (state) => state.users.oneUser;
export const selectUpdateMessage = (state) => state.users.updateMessage;
export const selectUpdateState = (state) => state.users.isUpdated;
export const selectRegisteredState = (state) => state.users.isRegistered;
export const selectLoggedInState = (state) => state.users.isLoggedIn;
export const selectLoggedOutState = (state) => state.users.isLoggedOut;
export const selectLoadingUsers = (state) => state.users.isLoading;
export const selectErrorUsers = (state) => state.users.hasError;
export const selectErrorMessageUsers = (state) => state.users.errorMessage;

// Action
export const { clearRegistered } = usersSlice.actions;

// Reducer
export default usersSlice.reducer;
