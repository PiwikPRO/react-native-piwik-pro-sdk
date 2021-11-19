import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

interface AppState {
  message: string;
  eventNum: number;
  dispatchInterval: number;
}

const initialState: AppState = {
  message: 'Press any button',
  eventNum: 1,
  dispatchInterval: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = `${action.payload} ${state.eventNum}`;
      state.eventNum += 1;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.message = `Error: ${action.payload}`;
    },
    setDispatchInterval: (state, action: PayloadAction<number>) => {
      state.dispatchInterval = action.payload;
    },
  },
});

export const { setMessage, setError, setDispatchInterval } = appSlice.actions;

export const messageSelector = (state: RootState) => state.app.message;
export const eventNumSelector = (state: RootState) => state.app.eventNum;
export const dispatchIntervalSelector = (state: RootState) =>
  state.app.dispatchInterval;

export default appSlice.reducer;
