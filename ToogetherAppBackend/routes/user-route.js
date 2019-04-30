const express = require("express");
const router =  express.Router();
const userService = require('../services/user.service');
const config = require("../config");
const upload = config.ConfigMulter().upload;
const uploadMulti = config.ConfigMulterMultiImages().upload;

async function register(req,res) {
    let resultOfCreate;
    try {
        resultOfCreate = await userService.create(req.body, req);
        res.status(200).json({
            message: resultOfCreate,
        })
    } catch (error) {
        res.status(400).json({
            message: error,
        })
    } finally {
        console.log('The function register() ended!');
    }
}
async function getUsers(req, res) {
    try {
        const resultFetchedUsers = await userService.get();
            res.status(200).json({
                message: resultFetchedUsers
            })
    } catch (error) {
            res.status(400).json({
                message: error
        })
    } finally {
        console.log('The function getUsers() ended!');
    }
}
async function updateUser(req,res) {
    
    try {
        const resultOfUpdateUser = await userService.update(req.body, req.params.id, req);
        res.status(200).json({
            message: resultOfUpdateUser.userData
        })
    } catch (error) {
        res.status(400).json({
            message: error,
        })
    } finally {
        console.log('The function updateUser() ended!');
    }    
}
async function attemptToLogin(req, res) {
    try {
        const resultOfLoginAttempt = await userService.login(req.body);
        res.status(200).json({
            message: resultOfLoginAttempt.userData
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    } finally {
        console.log('The function attemptToLogin() ended!');
    }
}
async function updateStatus(req, res) {
    try {
        
        const updateStatus = await userService.changeStatus(req.params.id, req.body.action);
        res.status(200).json({
            message: updateStatus.success,
        }) 
    } catch (error) {
        res.status(400).json({
            message: error
        })
    } finally{
        console.log('The function updateStatus() ended!');
    }
}


async function GetLoggedInUser(req,res) {
    try {
        const ConnectedUser = await userUtil.GetConnectedUser(req.params.id, req);
        res.status(200).json({
            userData: ConnectedUser.message
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            userData: ConnectedUser.message
        })
    } finally {

    }
}
async function GetImagesWithPaginator(req,res) {

    try {
        const imagesWithPaginator = await userUtil.getImagesOnly(req);
        res.status(200).json({
            userData: imagesWithPaginator.message
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            userData: imagesWithPaginator.message
        })
    }
}
async function UpdateImagesCollectionOfUser(req,res) {

    let NewCollectionOfImages
        try {
        NewCollectionOfImages = await userUtil.UpdateCollection(req, req.params.id);
        
        res.status(200).json({
            userData: NewCollectionOfImages.message
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            userData: NewCollectionOfImages.message
        })
    } finally {

    }
}

router.post('/register', upload, register);
router.post('/login', attemptToLogin);
router.put('/:id', updateStatus);
router.put('/:id',upload, updateUser);
router.get('', getUsers);

router.post('/images/:id', uploadMulti, UpdateImagesCollectionOfUser);
router.get('/images/:id',GetImagesWithPaginator);
router.get('/:id', GetLoggedInUser);




module.exports = router;

