import mongoose from "mongoose";
const { Schema } = mongoose;

const ItemsSchema = new Schema(
  {
    serviceType: {
      type: String,
      required: true,
    },
    quotation: {
      type: String,
      required: true,
    },
    operationLocation: {
      type: String,
      required: true,
    },
    cartype: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },
    ProviderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Items", ItemsSchema);
