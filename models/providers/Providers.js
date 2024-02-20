import mongoose from "mongoose";
const { Schema } = mongoose;

const ProviderSchema = new Schema(
  {
    companyname: {
      type: String,
      required: true,
      unique: true,
    },
    companytype: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Provider", ProviderSchema);
