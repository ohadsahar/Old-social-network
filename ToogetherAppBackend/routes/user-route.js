const express = require("express");
const router =  express.Router();
const config = require("../config");
const userUtil = require("../utils/userUtil.util");
const validateUtil = require('../utils/validateUtil.util');
const winston = require("winston");
const upload = config.ConfigMulter().upload;
const uploadMulti = config.ConfigMulterMultiImages().upload;

async function RegisterUser(req,res) {
    let validationUserAndThenRegister;
    try {
        validationUserAndThenRegister = await validateUtil.ValidateRegisterInput(req.body, req);
        res.status(200).json({
            userData: validationUserAndThenRegister.message
        })
    } catch (error) {
        res.status(400).json({
            userData: validationUserAndThenRegister.message
        })
    } finally {

    }
}
async function FetchAllUsers(req, res) {
    try {
        const FetchedUsers = await userUtil.GetAllUsers();
            res.status(200).json({
                userData: FetchedUsers.message
            })
    } catch (error) {
            res.status(400).json({
                userData: FetchedUsers.message
        })
    } finally {

    }
}
async function LoginToSystem(req, res) {
    try {
        const ValidateLoginInputAndThenLogin = await validateUtil.ValidateLoginInput(req.body);
        res.status(200).json({
            userData: ValidateLoginInputAndThenLogin.message
        })
    } catch (error) {
        res.status(400).json({
            userData: ValidateLoginInputAndThenLogin.message
        })
    } finally {

    }
}
async function UpdateLoggedUser(req, res) {
    try {
        const UpdateUser = await userUtil.UpdateUserLogStatus(req.params.id, req.body.action);
            res.status(200).json({
                message: UpdateUser.message.success,
            }) 
    } catch (error) {
        res.status(400).json({
            message: UpdateUser.message.success,
        })
    } finally{
    }
}
async function GetLoggedInUser(req,res) {
    try {
        const ConnectedUser = await userUtil.GetConnectedUser(req.params.id);
        res.status(200).json({
            userData: ConnectedUser.message
        });
    } catch (error) {
        res.status(400).json({
            userData: ConnectedUser.message
        })
    } finally {

    }
}
async function UpdateUser(req,res) {
    try {
        const validateUserInputAndThenUpdateUser = await validateUtil.ValidateUserInputForUpdate(req.body, req.params.id, req);
        res.status(200).json({
            userData: validateUserInputAndThenUpdateUser.message,
        })
    } catch (error) {
        res.status(400).json({
            userData: validateUserInputAndThenUpdateUser.message,
        })
    } finally {
    }    
}
async function UpdateImagesCollectionOfUser(req,res) {
        try {
        let NewCollectionOfImages = await userUtil.UpdateCollection(req, req.params.id);
        
        res.status(200).json({
            userData: NewCollectionOfImages.message
        })
    } catch (error) {
        res.status(400).json({
            userData: NewCollectionOfImages.message
        })
    } finally {

    }
}

router.post('/login', LoginToSystem);
router.post('/register', upload, RegisterUser);
router.post('/:id',upload, UpdateUser )
router.post('/images/:id', uploadMulti, UpdateImagesCollectionOfUser);
router.get('', FetchAllUsers);
router.get('/:id', GetLoggedInUser);
router.put('/:id', UpdateLoggedUser);

module.exports = router;

