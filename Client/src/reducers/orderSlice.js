// orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    selectedGig: null,
    // Other order-related fields
  },
  reducers: {
    setSelectedGig: (state, action) => {
      state.selectedGig = action.payload;
    },
    // Other reducers for managing order datag
  },
});

export const { setSelectedGig } = orderSlice.actions;
export default orderSlice.reducer;
