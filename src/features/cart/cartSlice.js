import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosApiPrivate } from "../../config/axiosConfig";

// Add product to cart
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ product_id, quantity, color, cart_id }, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.post(`/carts/${cart_id}`, {
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

// Get a user's cart products
export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.get(`/carts/${user_id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete cart product
export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async ({ cart_id, product_id }, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.delete(
        `/carts/${cart_id}/products/${product_id}`
      );
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
    removeProduct: (state, action) => {
      const productIndex = state.cartProducts.findIndex(
        (product) => product.id === action.payload
      );
      state.cartProducts.splice(productIndex, 1);
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
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.cartMessage = action.payload;
        state.cartQuantity -= 1;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
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
export const { clearCart, removeProduct } = cartSlice.actions;

// Reducer
export default cartSlice.reducer;
