const mongoose = require("mongoose");

const User = mongoose.Schema({

    email: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type:String, required: true},
    lastname: {type: String, required: true},
    superhero: {type: String, required: true},
    Image: {type: String, required: true},
    quote: [{
            name: {type: String},
            icon: { type: String},
    }],
    Images: [{
        imagename: {type: String},
    }],
    role: {type: String, required: true}
});

module.exports = mongoose.model("User", User);