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
import chartReducer from "./reducers/Chart/chart.jsx";
import companyReducer from "./reducers/Chart/clickCompany.jsx";
import clickIndicatorsReducer from "./reducers/Chart/Indicators/clickIndicators.jsx";
import getChartIndicatorReducer from "./reducers/Chart/Indicators/chart.jsx";
import getSubIndicatorReducer from "./reducers/Chart/Indicators/sub.jsx";
import searchReducer from "./reducers/Trading/search";
import userReducer from "./reducers/User/user";
import feedReducer from "./reducers/Feed/feed";
import hotStockReducer from './reducers/Hot/getStockInfo.jsx';
import strategyReducer from './reducers/Strategy/getStrategy.jsx';

const rootPersistConfig = {
  key: "root",
  storage: storage,
  // whitelist: ["chartValues", "indicatorValues"],
  whitelist: [
    "user",
    "chartValues",
    "indicatorValues",
    "search",
    "chart",
    "clickIndicator",
    "getChartIndicator",
    "getSubIndicator",
    "company",
  ],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    trading: tradingReducer,
    chart: chartReducer,
    company: companyReducer,
    chartValues: chartValuesReducer,
    indicatorValues: indicatorValuesReducer,
    clickIndicator: clickIndicatorsReducer,
    getChartIndicator: getChartIndicatorReducer,
    getSubIndicator: getSubIndicatorReducer,
    search: searchReducer,
    user: userReducer,
    feed: feedReducer,
    hot: hotStockReducer,
    strategy: strategyReducer,
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
