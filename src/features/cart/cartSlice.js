import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosApiPrivate } from "../../config/axiosConfig";

// Add product to cart
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ product_id, quantity, color, id }, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.post(`/carts/${id}`, {
        product_id,
        quantity,
        color,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state
const initialState = {
  cartMessage: {},
  isLoading: false,
  hasError: false,
  errorMessage: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cartMessage = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

// Selectors
export const selectCartMessage = (state) => state.cart.cartMessage;
export const selectErrorMessageCart = (state) => state.cart.errorMessage;
export const selectLoadingCart = (state) => state.cart.isLoading;
export const selectErrorCart = (state) => state.cart.hasError;

// Reducer
export default cartSlice.reducer;
