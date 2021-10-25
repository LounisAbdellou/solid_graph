import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personId: "",
}

export const trajectoriesSlice = createSlice({
  name: 'trajectories',
  initialState,

  reducers: {
    switchPersonId: (state, action) => {
      state.personId = action.payload;
    },
  },
});

export const { switchPersonId } = trajectoriesSlice.actions;

export const selectPersonId = (state) => state.trajectories.personId;

export default trajectoriesSlice.reducer;
