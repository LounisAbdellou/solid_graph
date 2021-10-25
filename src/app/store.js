import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import trajectoriesReducer from 'features/trajectories/trajectoriesSlice';
import histogramReducer from 'features/histogram/histogramSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    trajectories: trajectoriesReducer,
    histogram: histogramReducer,
  },
});
