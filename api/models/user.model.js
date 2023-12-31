import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,    
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
 password:{
    type: String,
    required: true,
  },
  img:{
    type: String,
    required: false,
    
  },
  name:{
    type: String,
    required: false
  },
  country:{
    type: String,
    required: true,
    
  },
  phone:{
    type: String,
    required: false,
    unique: true
  },
  desc:{
    type: String,
    required: false,
    
  },
  isSeller:{
    type: Boolean,
    default: false,
    
  },
  isVerified:{
    type: Boolean,
    default: false,
    
  },
  emailToken:{
    type: String, 
    
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },

}, {
    timestamps:true
});

export default mongoose.model("User", userSchema)