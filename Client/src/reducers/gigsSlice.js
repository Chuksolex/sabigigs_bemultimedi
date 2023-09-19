// gigsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const gigsSlice = createSlice({

  name: 'gigs',
  initialState: {
    data: null,
    timestamp: null,
    // filters: {
    //   minPrice: 0,
    //   maxPrice: Number.MAX_VALUE,
    // },
    // search: '', 
    // sort: 'sales'
  },
  reducers: {
    
    updateGigsData: (state, action) => {
      console.log(action.payload, 'payload')
        state.data = action.payload; // Update the gigs array in the state
        state.timestamp = Date.now(); // Update the timestamp
      },
      // updateFilters: (state, action) => {
        
      //   state.filters = action.payload;
      // },
      // updateSearch: (state, action) => {
      //   state.search = action.payload;
      // },
      // updateSort: (state, action) => {
      //   state.sort = action.payload;
      // },
   
  },
});


export const { updateGigsData, updateFilters, updateSearch, updateSort} = gigsSlice.actions;
export default gigsSlice.reducer;
