import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

interface AppState {
  message: string;
  eventNum: number;
  dispatchInterval: number;
  sdkInitialized: boolean;
}

const initialState: AppState = {
  message: 'Press any button',
  eventNum: 1,
  dispatchInterval: 0,
  sdkInitialized: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = `${action.payload}`;
    },
    setEventMessage: (state, action: PayloadAction<string>) => {
      state.message = `${action.payload} ${state.eventNum}`;
      state.eventNum += 1;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.message = `Error: ${action.payload}`;
    },
    setDispatchInterval: (state, action: PayloadAction<number>) => {
      state.dispatchInterval = action.payload;
    },
    setSdkInitializationState: (state, action: PayloadAction<boolean>) => {
      state.sdkInitialized = action.payload;
    },
  },
});

export const {
  setMessage,
  setError,
  setDispatchInterval,
  setSdkInitializationState,
  setEventMessage,
} = appSlice.actions;

export const messageSelector = (state: RootState) => state.app.message;
export const eventNumSelector = (state: RootState) => state.app.eventNum;
export const dispatchIntervalSelector = (state: RootState) =>
  state.app.dispatchInterval;
export const sdkInitializedSelector = (state: RootState) =>
  state.app.sdkInitialized;

export default appSlice.reducer;
