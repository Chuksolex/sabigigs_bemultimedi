import mongoose from 'mongoose';
const { Schema } = mongoose;

const projectRequestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    number: { type: String, required: true },
    country: {
      name: { type: String, required: true },
      dialCode: { type: String, required: true },
      countryCode: { type: String, required: true },
      format: { type: String, required: true },
    },
    formattedValue: { type: String, required: true },
  },
  projectDescription: { type: String, required: true },
  startDate: { type: Date, required: false },
  budget: { type: Number, required: false },
   currency: { type: String, required: true } 
});
export default mongoose.model("ProjectRequest", projectRequestSchema)
