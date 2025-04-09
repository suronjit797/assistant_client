import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
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
  blackList: ["api"],
};
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  theme: persistReducer(persistConfig, themeReducer),

  // rtk query api
  api: mainApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: envConfig.NODE_ENV === "development",
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mainApi.middleware),
});

export const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define a custom hook for useDispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
