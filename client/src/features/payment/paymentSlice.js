import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosApiPrivate } from "../../config/axiosConfig";

// Register
export const fetchClientSecret = createAsyncThunk(
  "payment/fetchClientSecret",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.post(
        "/payment/create-payment-intent"
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state
const initialState = {
  clientSecret: "",
  isLoading: false,
  hasError: false,
  errorMessage: {},
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetError: (state) => {
      state.hasError = false;
      state.errorMessage = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientSecret.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchClientSecret.fulfilled, (state, action) => {
        state.clientSecret = action.payload.clientSecret;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchClientSecret.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      });
  },
});

// Selectors
export const selectClientSecret = (state) => state.payment.clientSecret;
export const selectLoadingPayment = (state) => state.payment.isLoading;
export const selectErrorPayment = (state) => state.payment.hasError;
export const selectErrorMessagePayment = (state) => state.payment.errorMessage;

// Action
export const { resetError } = paymentSlice.actions;

// Reducer
export default paymentSlice.reducer;
