import mongoose from "mongoose";
const { Schema } = mongoose;

const TripSchema = new Schema(
  {
    usernameid: {
      type: String,
      required: true,
    },
    itemid: {
      type: String,
      required: true,
    },
    providerid: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
    },
    paymentoption: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "pending", 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trips", TripSchema);
