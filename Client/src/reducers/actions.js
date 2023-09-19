import { updateGigsData } from './gigsSlice';
import newRequest from '../utils/newRequest';




export const fetchAndUpdateGigsData = (search, filters, sort) => async (dispatch) => {
  try {
    const response = await newRequest.get(`/gigs`);
    //const gigs = response.data;

    
    dispatch(updateGigsData(response)); // Update gigs data and timestamp
  } catch (error) {
    console.error('Error fetching gigs in action creator:', error);
  }
};

// Other action creators...
// Middleware or Action Creator to check and fetch if data is expired
export const checkAndFetchIfExpired = () => async (dispatch, getState) => {
    const state = getState();
    const { timestamp } = state.gigsSlice;
  
    if (!timestamp || Date.now() - timestamp > 1 * 60 * 60 * 1000) {
      // Data is expired or not available, fetch new data
      dispatch(fetchAndUpdateGigsData());
    }
  };
