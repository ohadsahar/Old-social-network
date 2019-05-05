const moongoose = require('mongoose');

const post = moongoose.Schema({

    email: {type: String},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    icon: {type: String, required: true},
    postimage: {type: String},
    postdate: {type: String, required: true},
    postinfo: {type: String, required: true},
    numberoflikes: {type: String},
    comments: [{
        firstname:{type: String},
        lastname: {type: String},
        icon: {type: String},
        commentinfo:{type: String},
        subcomments: [{
            firstname:{type: String},
            lastname: {type: String},
            icon: {type: String},
            subcommentinfo:{type: String}
        }]
    }]
})

module.exports = moongoose.model("post", post);
