
const mongoose = require("mongoose");


const OrderSchema = mongoose.Schema({

  userid: {type: String},
  orderDate: {type: String, required: true},
  orderTotal: {type: Number, required: true},
  month: {type: String, required: true},
  Cart:[{
    productName: {type: String},
    productPrice: {type: String},
    productInformation: {type: String},
    Image:{type: String},
    id: {type: String},
}],
  firstname: {type: String},
  lastname: {type: String},
  email: {type: String},

});

module.exports = mongoose.model("Order", OrderSchema);

