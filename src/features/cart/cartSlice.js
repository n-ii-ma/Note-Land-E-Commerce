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

export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.get(`/carts/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state
const initialState = {
  cartProducts: {},
  cartMessage: {},
  cartQuantity: 0,
  isLoading: false,
  hasError: false,
  errorMessage: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cartMessage = action.payload;
        state.cartQuantity += 1;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getCartProducts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.cartProducts = action.payload;
        state.cartQuantity = action.payload.length;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

// Selectors
export const selectCartProducts = (state) => state.cart.cartProducts;
export const selectCartMessage = (state) => state.cart.cartMessage;
export const selectErrorMessageCart = (state) => state.cart.errorMessage;
export const selectCartQuantity = (state) => state.cart.cartQuantity;
export const selectLoadingCart = (state) => state.cart.isLoading;
export const selectErrorCart = (state) => state.cart.hasError;

// Action
export const { clearCart } = cartSlice.actions;

// Reducer
export default cartSlice.reducer;
