import mongoose from 'mongoose';

const livetutorRegisterSchema = new mongoose.Schema({
  parent_name: { type: String, required: true },
  child_name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  prefered_time: { type: String, required: true },
  plan: { type: String, required: true },
});

const livetutorRegister = mongoose.model('livetutorRegister', livetutorRegisterSchema);

export default livetutorRegister;
