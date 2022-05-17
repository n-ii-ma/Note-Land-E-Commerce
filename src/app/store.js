import { configureStore } from "@reduxjs/toolkit";

import productsSliceReducer from "../features/products/productsSlice";
import usersSliceReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    products: productsSliceReducer,
    users: usersSliceReducer,
  },
});
