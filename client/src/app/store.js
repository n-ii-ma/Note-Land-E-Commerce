import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import productsSliceReducer from "../features/products/productsSlice";
import usersSliceReducer from "../features/users/usersSlice";
import cartSliceReducer from "../features/cart/cartSlice";
import paymentSliceReducer from "../features/payment/paymentSlice";
import ordersSliceReducer from "../features/orders/ordersSlice";

const rootReducer = combineReducers({
  products: productsSliceReducer,
  users: usersSliceReducer,
  cart: cartSliceReducer,
  payment: paymentSliceReducer,
  orders: ordersSliceReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["users", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development' && true,
});
