
const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({

  productName: {type: String, required: true},
  productPrice: {type: String, required: true},
  productInformation: {type: String, required: true},
  Image: {type: String, required: true}
});

module.exports = mongoose.model("Product", ProductSchema);

