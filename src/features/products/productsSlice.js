import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosApi from "../../config/axiosConfig";

// Get all the products from the API
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axiosApi.get("/products");
    return response.data;
  }
);

// Get a product's details from the API
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (productId) => {
    const response = await axiosApi.get(`/products/${productId}`);
    return response.data;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.allAreLoading = true;
        state.allHaveError = false;
        state.oneIsLoading = false;
        state.oneHasError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.allAreLoading = false;
        state.allHaveError = false;
        state.oneProduct = [];
        state.oneIsLoading = false;
        state.oneHasError = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.allAreLoading = false;
        state.allHaveError = true;
        state.oneIsLoading = false;
        state.oneHasError = false;
      })
      .addCase(getProduct.pending, (state, action) => {
        state.oneIsLoading = true;
        state.oneHasError = false;
        state.allAreLoading = false;
        state.allHaveError = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.oneProduct = action.payload;
        state.oneIsLoading = false;
        state.oneHasError = false;
        state.allProducts = [];
        state.allAreLoading = false;
        state.allHaveError = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.oneIsLoading = false;
        state.oneHasError = true;
        state.allAreLoading = false;
        state.allHaveError = false;
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

// Reducer
export default productsSlice.reducer;
