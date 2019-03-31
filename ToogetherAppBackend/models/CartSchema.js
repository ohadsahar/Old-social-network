const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userid: {type: String},
    Cart:[{
        
        productName: {type: String},
        productPrice: {type: String},
        productInformation: {type: String},
        Image:{type: String},
        id: {type: String},
    }],
    
});

module.exports = mongoose.model("Cart", CartSchema);