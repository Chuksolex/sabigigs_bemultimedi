

import mongoose from 'mongoose';
const { Schema } = mongoose;

const packageSchema = new mongoose.Schema({
  shortTitle: { type: String, required: true },
  price: { type: Number, required: true },
  shortDesc:{type: String, required: true},
  features: [{ type: String, required: true }],
  
    
    deliveryTime: {
        type: Number,
        required: true
    },
    
    revisionNumber: {
        type: Number,
        required:true
    },
   

});

export default mongoose.model("Package", packageSchema)


