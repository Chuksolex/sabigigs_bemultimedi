import mongoose from 'mongoose';
const { Schema } = mongoose;
import Gig from './gig.model.js';


const orderSchema = new Schema({
  gigId: {
    type: String,
    required: true,    
  },
  img:{
    type: String,
    required: false,    
  },
  title:{
    type: String,
    required: true,
    
  },
  price: {
     type: Number,
      required: true
 },
 orderDetails: {
  type: [String],
  required: false
 },

 
  sellerId:{
    type: String,
    required: true
  },
  buyerId:{
    type: String,
    required: true,
    
  },
  isCompleted:{
    type: Boolean,
    default: false,
    
  },
  payment_intent:{
    type: String,
    required: true,
    
  },
}, {
    timestamps:true
});

export default mongoose.model("Order", orderSchema)