import { configureStore } from '@reduxjs/toolkit';
import questionSlice from './features/questionSlice';
import progressSlice from './features/progressSlice';

export const store = configureStore({
  reducer: {
    question: questionSlice,
    progress: progressSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
