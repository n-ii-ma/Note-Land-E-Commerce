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

// Add product to cart
export const updateCartProduct = createAsyncThunk(
  "cart/updateCartProduct",
  async ({ product_id, quantity, cart_id }, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.put(`/carts/${cart_id}`, {
        product_id,
        quantity,
      });
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

// Check out cart
export const checkout = createAsyncThunk(
  "cart/checkout",
  async (cart_id, { rejectWithValue }) => {
    try {
      const response = await axiosApiPrivate.post(`/carts/${cart_id}/checkout`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state
const initialState = {
  cartProducts: [],
  cartMessage: {},
  checkoutMessage: {},
  cartQuantity: 0,
  isLoading: false,
  hasError: false,
  refreshCart: false,
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
        (product) => product.product_id === action.payload
      );
      state.cartProducts.splice(productIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.refreshCart = false;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cartMessage = action.payload;
        state.checkoutMessage = {};
        state.refreshCart = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
        state.hasError = true;
        state.refreshCart = false;
      })
      .addCase(getCartProducts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.refreshCart = false;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.cartProducts = action.payload;
        state.cartQuantity = Array.isArray(action.payload)
          ? action.payload.length
          : 0;
        state.refreshCart = false;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
        state.hasError = true;
        state.refreshCart = false;
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.refreshCart = false;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.refreshCart = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
        state.hasError = true;
        state.refreshCart = false;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.refreshCart = false;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.refreshCart = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
        state.hasError = true;
        state.refreshCart = false;
      })
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.refreshCart = false;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.checkoutMessage = action.payload;
        state.cartProducts = [];
        state.cartQuantity = 0;
        state.refreshCart = false;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
        state.hasError = true;
        state.refreshCart = false;
      });
  },
});

// Selectors
export const selectCartProducts = (state) => state.cart.cartProducts;
export const selectCartMessage = (state) => state.cart.cartMessage;
export const selectCheckoutMessage = (state) => state.cart.checkoutMessage;
export const selectErrorMessageCart = (state) => state.cart.errorMessage;
export const selectCartQuantity = (state) => state.cart.cartQuantity;
export const selectRefreshCart = (state) => state.cart.refreshCart;
export const selectLoadingCart = (state) => state.cart.isLoading;
export const selectErrorCart = (state) => state.cart.hasError;

// Action
export const { clearCart, removeProduct } = cartSlice.actions;

// Reducer
export default cartSlice.reducer;
