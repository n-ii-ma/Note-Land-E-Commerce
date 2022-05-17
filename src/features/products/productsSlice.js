import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosApi from "../../config/axiosConfig";

// Get all the products from the API
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/products");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get a product's details from the API
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/products/${productId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    allAreLoading: false,
    allHaveError: false,
    oneProduct: [],
    oneIsLoading: false,
    oneHasError: false,
    errorMessage: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.allAreLoading = true;
        state.allHaveError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.allAreLoading = false;
        state.allHaveError = false;
        state.oneProduct = [];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.allAreLoading = false;
        state.allHaveError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getProduct.pending, (state, action) => {
        state.oneIsLoading = true;
        state.oneHasError = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.oneProduct = action.payload;
        state.oneIsLoading = false;
        state.oneHasError = false;
        state.allProducts = [];
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.oneIsLoading = false;
        state.oneHasError = true;
        state.errorMessage = action.payload;
      });
  },
});

// Selectors
export const selectAllProducts = (state) => state.products.allProducts;
export const selectAllLoadingProducts = (state) => state.products.allAreLoading;
export const selectAllErrorProducts = (state) => state.products.allHaveError;
export const selectOneProduct = (state) => state.products.oneProduct;
export const selectOneLoadingProduct = (state) => state.products.oneIsLoading;
export const selectOneErrorProduct = (state) => state.products.oneHasError;
export const selectErrorMessageProduct = (state) => state.products.errorMessage;

// Reducer
export default productsSlice.reducer;
