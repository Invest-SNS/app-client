import React from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import logger from "redux-logger";
import tradingReducer from "./reducers/Trading/trading";
import chartValuesReducer from "./reducers/Trading/chartValues";
import indicatorValuesReducer from "./reducers/Trading/indicatorValues";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  // whitelist: ["chartValues", "indicatorValues"],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    // 임시 reducer
    trading: tradingReducer,
    chartValues: chartValuesReducer,
    indicatorValues: indicatorValuesReducer,
  })
);
const myMiddlewares = [logger];
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(myMiddlewares),
});

export const persistor = persistStore(store);
