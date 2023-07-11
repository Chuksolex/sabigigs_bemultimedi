
import mongoose from 'mongoose';
const { Schema } = mongoose;

const recommendationSchema = new mongoose.Schema({
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
    score: Number,
});

export default mongoose.model('Recommendation', recommendationSchema);
