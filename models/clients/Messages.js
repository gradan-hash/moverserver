import mongoose from "mongoose";
const { Schema } = mongoose;

const MesssageSchema = new Schema({
  clientid: {
    type: String,
    required: true,
  },
  providerid: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },

}{timestamps:true});


export default mongoose.model("Messages",MesssageSchema)
