const express = require("express");
const router = express.Router();
const config = require("../config");
const userService = require('../services/user.service');
const userUtil = require('../utils/userUtil.util');
const upload = config.configMulter().upload;
const uploadMulti = config.configMulterMultiImages().upload;
const authUtil = require('../middleware/validate-auth');

async function getUsers(req, res) {
    try {
        const resultFetchedUsers = await userService.get();
        res.status(200).json({message: resultFetchedUsers,success: true})
    } catch (error) {
        res.status(400).json({message: error,success: false})
    } finally {
        console.log('The function getUsers() ended!');
    }
}
async function updateUser(req, res) {

    try {
        const resultOfUpdateUser = await userService.update(req.body, req.params.id, req);
        res.status(200).json({message: resultOfUpdateUser.userData,success: true})
    } catch (error) {
        res.status(400).json({message: error,success: false})
    } finally {
        console.log('The function updateUser() ended!');
    }
}
async function getCurrentUser(req, res) {
    try {
        const resultOfConnectedUser = await userService.getConnectedUser(req.params.id);
        res.status(200).json({message: resultOfConnectedUser,success: true});
    } catch (error) {
        res.status(400).json({userData: error,success: false})
    } finally {
        console.log('The function getCurrentUser() ended!');
    }
}
async function getImagesCollection(req, res) {
    try {
        const resultOfImagesCollection = await userService.getImagesCollection(req);
        res.status(200).json({message: resultOfImagesCollection, success: true})
    } catch (error) {
        res.status(400).json({message: error,success: false})
    } finally {
        console.log('The function getImagesCollection() ended!');
    }
}
async function updateImagesCollectionOfUser(req, res) {
    try {
        const NewCollectionOfImages = await userUtil.UpdateCollection(req, req.params.id);
        res.status(200).json({userData: NewCollectionOfImages.message,success: true})
    } catch (error) {
        res.status(400).json({userData: error,success: false})
    } finally {
        console.log('The function updateImagesCollectionOfUser() ended!');
    }
}

router.post('/images/:id', uploadMulti, updateImagesCollectionOfUser);
router.get('', getUsers);
router.get('/images/:id', getImagesCollection);
router.get('/:id', getCurrentUser);
router.put('/:id', upload, updateUser);

module.exports = router;