import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      unique: true,
      required: true,
    },

    category: String,

    color: String,

    size: String,

    moqPackaging: String,

    capType: String,

    usage: String,

    keySpecs: String,

    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);