// orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    selectedCurrency: "USD",
    // Other order-related fields
  },
  reducers: {
    updateCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
      console.log('Updating currency to:', action.payload);
    },
    // Other reducers for managing order data
  },
});

export const { updateCurrency } = currencySlice.actions;
export default currencySlice.reducer;
