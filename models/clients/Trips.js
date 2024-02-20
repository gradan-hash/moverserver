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
      unique: true,
    },
    providerid: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trips", TripSchema);
