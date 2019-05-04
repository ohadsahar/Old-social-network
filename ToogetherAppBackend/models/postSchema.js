const moongoose = require('mongoose');

const post = moongoose.Schema({

    id: {type: String, required: true},
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    icon: {type: String, required: true},
    postimage: {type: String, required: true},
    postdate: {type: String, required: true},
    postinfo: {type: String, required: true},
    numberoflikes: {type: String},
    comments: [{
        commentinfo:{type: String},
        subcomments: [{
            subcommentinfo:{type: String}
        }]
    }]
})

module.exports = moongoose.model("post", post);
