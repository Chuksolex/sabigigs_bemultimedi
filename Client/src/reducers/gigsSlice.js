// gigsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const gigsSlice = createSlice({

  name: 'gigs',
  initialState: {
    data: null,
    timestamp: null,
   
  },
  reducers: {
    
    updateGigsData: (state, action) => {
      console.log(action.payload, 'payload')
        state.data = action.payload; // Update the gigs array in the state
        state.timestamp = Date.now(); // Update the timestamp
      },
     
   
  },
});


export const { updateGigsData} = gigsSlice.actions;
export default gigsSlice.reducer;
