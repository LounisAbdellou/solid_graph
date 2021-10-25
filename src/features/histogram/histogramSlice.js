import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  histogramType: "Not Selected",
}

export const histogramSlice = createSlice({
  name: 'histogram',
  initialState,

  reducers: {
    switchHistogramType: (state, action) => {
      state.histogramType = action.payload;
    },
  },
});

export const { switchHistogramType } = histogramSlice.actions;

export const selectHistogramType= (state) => state.histogram.histogramType;

export default histogramSlice.reducer;
