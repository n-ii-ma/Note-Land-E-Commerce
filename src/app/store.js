import { configureStore } from "@reduxjs/toolkit";

import productsSliceReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsSliceReducer,
  },
});
