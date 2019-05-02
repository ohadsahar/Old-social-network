const express = require("express");
const router = express.Router();
const config = require("../config");
const userService = require('../services/user.service');
const userUtil = require('../utils/userUtil.util');
const upload = config.configMulter().upload;
const uploadMulti = config.configMulterMultiImages().upload;

async function register(req, res) {
    try {
        const resultOfCreate = await userService.create(req.body, req);
        res.status(201).json({
            message: resultOfCreate,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error,
            success: false
        })
    } finally {
        console.log('The function register() ended!');
    }
}
async function getUsers(req, res) {
    try {
        const resultFetchedUsers = await userService.get();
        res.status(200).json({
            message: resultFetchedUsers,
            success: true,
        })
    } catch (error) {
        res.status(400).json({
            message: error,
            success: false
        })
    } finally {
        console.log('The function getUsers() ended!');
    }
}
async function updateUser(req, res) {

    try {
        console.log(req.body);
        const resultOfUpdateUser = await userService.update(req.body, req.params.id, req);
        res.status(200).json({
            message: resultOfUpdateUser.userData,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error,
            success: false
        })
    } finally {
        console.log('The function updateUser() ended!');
    }
}
async function attemptToLogin(req, res) {
    try {
        const resultOfLoginAttempt = await userService.login(req.body);
        res.status(200).json({
            message: resultOfLoginAttempt.userData,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error,
            success: false
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
            success: true,
        })
    } catch (error) {
        res.status(400).json({
            message: error,
            success: false
        })
    } finally {
        console.log('The function updateStatus() ended!');
    }
}
async function getCurrentUser(req, res) {
    try {
        const resultOfConnectedUser = await userService.getConnectedUser(req.params.id);
        res.status(200).json({
            message: resultOfConnectedUser,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            userData: error,
            success: false
        })
    } finally {

    }
}
async function getImagesCollection(req, res) {
    try {
        const resultOfImagesCollection = await userService.getImagesCollection(req);
        res.status(200).json({
            message: resultOfImagesCollection,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error,
            success: false
        })
    }
}
async function updateImagesCollectionOfUser(req, res) {
    try {
        const NewCollectionOfImages = await userUtil.UpdateCollection(req, req.params.id);
        res.status(200).json({
            userData: NewCollectionOfImages.message,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            userData: error,
            success: false
        })
    } finally {}
}

router.post('/register', upload, register);
router.post('/login', attemptToLogin);
router.put('/:id', updateStatus);
router.put('/:id', upload, updateUser);
router.get('', getUsers);
router.post('/images/:id', uploadMulti, updateImagesCollectionOfUser);
router.get('/images/:id', getImagesCollection);
router.get('/:id', getCurrentUser);

module.exports = router;