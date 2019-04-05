const express = require("express");
const router = express.Router();

/* Utils */

const userUtil = require("../utils/userUtil.util");

async function RegisterUser(req,res) {

    try {
        const validateUserResult = await  userUtil.ValidateUser(req.body);
        if (validateUserResult.success) {
            const saveUserData = await userUtil.RegisterUser(validateUserResult.User);
            if (saveUserData.success) 
            {
                res.status(200).json({
                    UserObject: saveUserData.UserSaved,
                    message: saveUserData.message,
                    success: saveUserData.success
                })
            } else {
                res.status(401).json({
                    UserObject: saveUserData.UserSaved,
                    message: saveUserData.message,
                    success: saveUserData.success
                })
            }
        }
    } catch (error) {
        
    }
}


router.post('', RegisterUser);
module.exports = router;

