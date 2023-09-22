// frontend/store.js
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import cartSlice from './reducers/cartSlice'; // Create this reducer
import gigsSlice from './reducers/gigsSlice';
import orderSlice from './reducers/orderSlice';
import currencySlice from './reducers/currencySlice';

const rootReducer = combineReducers({
   cartSlice,
   gigsSlice,
   orderSlice,
  currencySlice
});


const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:   persistedReducer,
  middleware: [thunkMiddleware] // Apply redux-thunk middleware
});



export const  persistor = persistStore(store);

