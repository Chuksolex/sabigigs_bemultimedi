import mongoose from 'mongoose';
const { Schema } = mongoose;
import Gig from './gig.model.js';

const orderSchema = new Schema({
  sellerId: {
    type: String,
    required: true,
  },
  tx_ref: {
    type: String,
    required: true,
  },
  currency: String,
  totalQuantity: Number,
  overallTotalPrice: Number,   
  buyerId: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },

  gigs: [
    {
      gigId: {
        type: String,
        ref: "Gig",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      img: {
        type: String,
        required: false,    
      },
      orderDetails: {
        type: [String],
        required: false,
      },
      addons: [
        {
          title: { type: String, required: false },
          price: { type: Number, required: false },
        },
      ],
      // ... other fields related to each gig in the order
    },
  ], 
  
  totalAddonsPrice: {
    type: Number,
    default: 0,
  },
  
}, {
  timestamps: true
});

export default mongoose.model("Order", orderSchema);
