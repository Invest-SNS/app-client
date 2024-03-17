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
import chartReducer from './reducers/Chart/chart.jsx';
import companyReducer from './reducers/Chart/clickCompany.jsx';
import subChartReducer from './reducers/Chart/SubChart/clickSubChart.jsx';
import getSubChartReducer from './reducers/Chart/SubChart/subChart.jsx';

const rootPersistConfig = {
  key: "root",
  storage: storage,
  // whitelist: ["chartValues", "indicatorValues"],
  blacklist: ["subChart", "getSubChart"]
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    // 임시 reducer
    trading: tradingReducer,
    chart: chartReducer,
    company: companyReducer,
    chartValues: chartValuesReducer,
    indicatorValues: indicatorValuesReducer,
    subChart: subChartReducer,
    getSubChart: getSubChartReducer,
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
