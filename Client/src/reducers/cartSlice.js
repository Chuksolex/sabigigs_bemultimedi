import { createSlice } from '@reduxjs/toolkit';

// Define a cartSlice using createSlice
const cartSlice = createSlice({
  name: 'cart', 
  initialState: {
    cart: [], // Initial state with an empty cart array
    cartCount: 0,
  },
  reducers: {
    // Reducer function to add an item to the cart or increment its quantity
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++; // Increment the quantity if the item is already in the cart
      } else {
        state.cart.push({ ...action.payload, quantity: 1 }); // Add a new item to the cart with quantity 1
      } 
      state.cartCount = state.cart.length; // Update cart count
    },
  
      removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = removeItem; // Update the cart by removing the specified item
      state.cartCount = state.cart.length; // Update cart count
      state.totalPrice = calculateTotalPrice(state.cart);

    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++; // Increment the quantity of the specified item
        const total = Number(itemInCart.baseAmount) * itemInCart.quantity + 1;
        itemInCart.totalPrice = total;
        
      }
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        if (itemInCart.quantity === 1) {
          state.cart = state.cart.filter((item) => item.id !== action.payload.id);
         
        } else {
          itemInCart.quantity--; // Decrement the quantity of the specified item, but not below 1
        }
        state.cartCount = state.cart.length; // Update cart count
        const total = Number(itemInCart.baseAmount) * itemInCart.quantity + 1;
        itemInCart.totalPrice = total;
        
      }
    },
  } 
    
    
    
    
  
});

const calculateTotalPrice = cart => {
  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += item.totalPrice * item.quantity;
  });
  return totalPrice;
};
// Extract action creators from the cartSlice for using in components
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;

// Export the reducer function from the cartSlice to be used in the Redux store
export default cartSlice.reducer;


