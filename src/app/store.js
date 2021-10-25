import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import trajectoriesReducer from 'features/trajectories/trajectoriesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    trajectories: trajectoriesReducer,
  },
});
