import { configureStore } from '@reduxjs/toolkit';
import submissionReducer from './features/submission/submission-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      submission: submissionReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
