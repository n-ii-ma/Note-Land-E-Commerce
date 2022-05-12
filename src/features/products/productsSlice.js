import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get all the products from the API
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetch(
      "https://e-commerce-pern.herokuapp.com/api/v1/products"
    );
    if (!response.ok) throw new Error("Request Failed!");
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

// Selectors
export const selectAllProducts = (state) => state.products.allProducts;
export const selectLoadingProducts = (state) => state.products.isLoading;
export const selectErrorProducts = (state) => state.products.hasError;

// Reducer
export default productsSlice.reducer;
