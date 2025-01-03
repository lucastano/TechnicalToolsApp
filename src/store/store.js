import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedConfig = {
    key:'root',
    storage,
    // whitelist:['auth'],
};

const persistedAuthReducer = persistReducer(persistedConfig,authSlice.reducer);



export const store = configureStore({
    reducer:{
       auth : persistedAuthReducer,
    },
});
export const persistor = persistStore(store)