import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import chartsReducer from './slices/chartsSlice';
import tableReducer from './slices/tableSlice';
import requestsReducer from './slices/requestsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      dashboard: dashboardReducer,
      charts: chartsReducer,
      table: tableReducer,
      requests: requestsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
