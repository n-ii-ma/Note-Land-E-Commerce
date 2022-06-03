import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosApiPrivate } from "../../config/axiosConfig";

// Get order history
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.get(`/orders/${user_id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get order details
export const getOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (order_id, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.get(`/orders/details/${order_id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state
const initialState = {
  orders: [],
  orderDetails: [],
  isLoading: false,
  hasError: false,
  detailsLoading: false,
  errorMessage: {},
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.detailsLoading = true;
        state.hasError = false;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.detailsLoading = false;
        state.hasError = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.detailsLoading = false;
        state.hasError = true;
      });
  },
});

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrderDetails = (state) => state.orders.orderDetails;
export const selectLoadingOrders = (state) => state.orders.isLoading;
export const selectErrorOrders = (state) => state.orders.hasError;
export const selectErrorMessageOrders = (state) => state.orders.errorMessage;

// Reducer
export default ordersSlice.reducer;
