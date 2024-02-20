import mongoose from "mongoose";
const { Schema } = mongoose;

const MesssageSchema = new Schema(
  {
    clientid: {
      type: String,
      required: true,
    },
    providerid: {
      type: String,
      required: true,
    },
    uniqueid: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    replymesssage: {
      type: String,
    },
    sender: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Messages", MesssageSchema);
