
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import threatsSlice from './slices/threatsSlice';
import networkSlice from './slices/networkSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    threats: threatsSlice,
    network: networkSlice,
    ui: uiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
