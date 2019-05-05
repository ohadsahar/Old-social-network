const postSchema = require('../models/postSchema');

async function createPost(postData) {

    const createdPostObject = await createPostObject(postData);
    return {postData: createdPostObject};
}
async function getAllUsers() {

    const fetchedUsers = await postSchema.find();
    return {users: fetchedUsers};

}
async function createPostObject(postData) {

    const post = new postSchema({
        firstname: postData.firstname,
        lastname: postData.lastname,
        icon: postData.icon,
        postimage: postData.postimage,
        postinfo: postData.postinfo,
        postdate: postData.postdate,
        numberoflikes: postData.numberoflikes,
        image: postData.image,
        comments: null,
    })
    await post.save();
    return {postData: post};
}

module.exports = {
    createPost,
    getAllUsers,
    createPostObject
}