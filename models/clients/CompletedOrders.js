import mongoose from "mongoose";
const { Schema } = mongoose;

const CompletedSchema = new Schema(
  {
    tableid: {
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
    AmountPaid: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Completed", CompletedSchema);
