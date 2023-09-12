const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Products = new Schema(
  {
    name: { type: String },
    image: { type: String },
    price: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", Products);
