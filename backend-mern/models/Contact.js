import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    street: String,
    city: String,
    state: String,
    zip: String,
    latitude: Number,
    longitude: Number,
    groupId: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contact", contactSchema);