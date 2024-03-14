import React from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

import tradingReducer from './reducers/Trading/trading';
import chartReducer from './reducers/Chart/chart.jsx';
import companyReducer from './reducers/Chart/clickCompany.jsx';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: []
}

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    // 임시 reducer
    trading: tradingReducer,
    chart: chartReducer,
    company: companyReducer,
  })
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);