import mongoose from "mongoose";
const SupportRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  attachmentUrl: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SupportRequest', SupportRequestSchema);
