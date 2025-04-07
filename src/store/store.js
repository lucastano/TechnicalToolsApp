import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { persistStore, persistReducer,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistedConfig = {
    key:'root',
    storage,
    // whitelist:['auth'],
};

const persistedAuthReducer = persistReducer(persistedConfig,authSlice.reducer);
export const store = configureStore({
    reducer: {
      auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
export const persistor = persistStore(store)