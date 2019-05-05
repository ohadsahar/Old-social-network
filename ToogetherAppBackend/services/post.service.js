const postUtil = require('../utils/postUtil.util');

async function create(postData) {

    const resultOfCreatePost = await postUtil.createPost(postData);
    return {createdPost: resultOfCreatePost};
}

async function get() {

    const resultOfGetPosts = await postUtil.getAllUsers();
    return {users: resultOfGetPosts.users};
}



module.exports = {

    create,
    get
}