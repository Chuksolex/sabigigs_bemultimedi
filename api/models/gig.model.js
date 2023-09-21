import mongoose from 'mongoose';
const { Schema } = mongoose;

const gigSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      required: true,
    },
    price_basic: {
      type: Number,
      required: true,
    },
    price_standard: {
      type: Number,
      required: true,
    },
    price_premium: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    shortTitle_basic: {
      type: String,
      required: true,
    },
    shortTitle_standard: {
      type: String,
      required: true,
    },
    shortTitle_premium: {
      type: String,
      required: true,
    },
    shortDesc_basic: {
      type: String,
      required: true,
    },
    shortDesc_standard: {
      type: String,
      required: true,
    },
    shortDesc_premium: {
      type: String,
      required: true,
    },
    deliveryTime_basic: {
      type: Number,
      required: true,
    },
    deliveryTime_standard: {
      type: Number,
      required: true,
    },
    deliveryTime_premium: {
      type: Number,
      required: true,
    },
    revisionNumber_basic: {
      type: Number,
      required: false,
    },
    revisionNumber_standard: {
      type: Number,
      required: false,
    },
    revisionNumber_premium: {
      type: Number,
      required: false,
    },
    features_basic: {
      type: [String],
      required: false,
    },
    features_standard: {
      type: [String],
      required: false,
    },
    features_premium: {
      type: [String],
      required: false,
    },
    faqs: {
      type: [
        {
          question: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    sales: {
      type: Number,
      default: 0,
    },
    promoBadge: {
      type: Boolean,
      default: false,
    },
    topRatedSeller: {
      type: Boolean,
      default: false,
    },
    discountOffer: {
      type: Number,
      default: 0,
    },
    discountType: {
      type: String,
      enum: ["None", "Black Friday", "Deal of the Week", "Flash Sale"],
      default: "None",
    },
      discountStartDate: {
      type: Date,
      default: null
    },
    discountValidThrough: {
      type: Date,
      default: null
    },
    gigClicks: [
      {
        sessionID: {
          type: String,
          // Do not set required: true for sessionID in gigClicks
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    addons: [{
      title: { type: String, required: true },
      shortDesc: { type: String, required: true },
      price: { type: Number, required: true },
    }],
  },
  

  {
    timestamps: true,
  }
);

export default mongoose.model('Gig', gigSchema);
