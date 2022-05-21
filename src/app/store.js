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

const rootReducer = combineReducers({
  products: productsSliceReducer,
  users: usersSliceReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["users"],
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
});
