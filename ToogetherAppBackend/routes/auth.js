const express = require("express");
const router = express.Router();
const config = require("../config");
const userService = require('../services/user.service');
const upload = config.configMulter().upload;

async function register(req, res) {
    try {
        const resultOfCreate = await userService.create(req.body, req);
        res.status(201).json({message: resultOfCreate,success: true})
    } catch (error) {
        res.status(400).json({message: error,success: false})
    } finally {
        console.log('The function register() ended!');
    }
}
async function attemptToLogin(req, res) {
    try {     
        const resultOfLoginAttempt = await userService.login(req.body);
        res.status(200).json({message: resultOfLoginAttempt.userData, success: true})
    } catch (error) {
        res.status(400).json({message: error,success: false})
    } finally {
        console.log('The function attemptToLogin() ended!');
    }
}
async function updateStatus(req, res) {
    try {
        const updateStatus = await userService.changeStatus(req.params.id, req.body.action);
        res.status(200).json({message: updateStatus.success,success: true})
    } catch (error) {
        res.status(400).json({message: error,success: false})
    } finally {
        console.log('The function updateStatus() ended!');
    }
}

router.post('/register', upload, register);
router.post('/login', attemptToLogin);
router.put('/:id', updateStatus);

module.exports = router;