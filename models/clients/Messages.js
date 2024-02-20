import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema(
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
    messages: [
      {
        message: String,
        sender: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    replies: [
      {
        replyMessage: String,
        sender: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Messages", MessageSchema);
