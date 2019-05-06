const express = require('express');
const router = express.Router();
const postService = require('../services/post.service');
const config = require("../config");
const upload = config.configMulter().upload;


async function createPost(req,res) {

    try {
        const resultOfRegister = await postService.create(req.body);
        res.status(200).json({
            message: resultOfRegister.createdPost,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error,
            success: false
        })   
    }
}

async function getPosts(req, res) {

    try {
        const resultOfPosts = await postService.get();
        res.status(200).json({
            message: resultOfPosts.users,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: resultOfPosts.users,
            success: false
        })
        
    }
   
    

}

router.post('/register', upload, createPost);
router.get('', getPosts);
module.exports = router;