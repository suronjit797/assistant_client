import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

import envConfig from "@/config/envConfig";
import authReducer from "./features/authSlice";
import themeReducer from "./features/themeSlice";
import { mainApi } from "./mainApi";

const encryptor = encryptTransform({
  secretKey: envConfig.REACT_APP_REDUX_STORAGE_SECRET_KEY,
  onError: function (error) {
    console.log(error);
  },
});

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [encryptor],
};
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,

  // rtk query api
  [mainApi.reducerPath]: mainApi.reducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer(persistConfig, rootReducer as any);


export const store = configureStore({
  reducer: persistedReducer,
  devTools: envConfig.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define a custom hook for useDispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
