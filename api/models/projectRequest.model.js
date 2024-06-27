import mongoose from 'mongoose';
const { Schema } = mongoose;

const projectRequestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  projectDescription: { type: String, required: true },
  startDate: { type: Date, required: false },
  budget: { type: Number, required: false }
});
export default mongoose.model("ProjectRequest", projectRequestSchema)
