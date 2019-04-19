const express = require("express");
const router =  express.Router();
const config = require("../config");
const userUtil = require("../utils/userUtil.util");
const multer  = require('multer');

//const upload =  config.ConfigMulter().upload;


const storage = multer.diskStorage({
    destination: 'assets/images',
    filename: function(req, file ,cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage}).single('image');
  


async function RegisterUser(req,res) {

    console.log(req.body);
    try {
        const validateUserResult = await  userUtil.ValidateUser(req.body);
        if (validateUserResult.success) {
            const saveUserData = await userUtil.RegisterUser(validateUserResult.User, req);
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
async function FetchAllUsers(req, res) {

    try {

        const FetchedUsers = await userUtil.GetAllUsers();
        if (FetchedUsers.success) {
            res.status(200).json({
                Users: FetchedUsers.Users,
                message: FetchedUsers.message,
                success: FetchedUsers.success
            })
        }  
    } catch (error) {
            res.status(400).json({
                Users: FetchedUsers.Users,
                message: FetchedUsers.message,
                success: FetchedUsers.success
            })
    }
}
async function LoginToSystem(req, res) {

    
    try {
        const validateUserInput = await userUtil.ValidateUserInput(req.body);
        const Login = await userUtil.LoginValidate(validateUserInput.User);
        
       
        res.status(200).json({
            UserObject: Login.User,
            id: Login.id,
            token: Login.token,
            message: Login.message,
            success: Login.success
        })
    } catch (error) {
        res.status(200).json({
            message: Login.message,
            success: Login.success
        })
    }
}

async function UpdateLoggedUser(req, res) 
{
    try {
   
        const UpdateUser = await userUtil.UpdateUserLogStatus(req.params.id, req.body.action);
        
        if (UpdateUser.success) 
        {
         
            res.status(200).json({
                message: UpdateUser.message,
                success: UpdateUser.success
            })
        } else {
            res.status(403).json({
                message: UpdateUser.message,
                success: UpdateUser.success
            })
        }
    } catch (error) {
        res.status(500).json({
            message: UpdateUser.message,
            success: UpdateUser.success
        })
    }
 

}

async function GetLoggedInUser(req,res) {

    let User;
    try {
  
         User = await userUtil.GetConnectedUser(req.params.id);
        
        if(User.success) {
            res.status(200).json({
                UserObject: User.UserData,
                message: User.message,
                success: User.success
            });
        } else {
            res.status(401).json({
                message: User.message,
                success: User.success
            })
        }
    } catch (error) {
        res.status(500).json({
            message: User.message,
            success: User.success
        })
    }
   

}

async function UpdateUser(req,res) {

    try {
        const validateBeforeUpdate = await userUtil.ValidateUser(req.body);
        const updateUser = await userUtil.UpdateUser(validateBeforeUpdate.User, req.params.id);
        res.status(200).json({
            UserObject: updateUser.updatedUser
        })
    } catch (error) {
        res.statu(403).json({
            UserObject: req.body
        })
    }

    
}

router.post('/login', LoginToSystem);
router.post('/register',upload,RegisterUser);
router.post('/:id', UpdateUser )
router.get('', FetchAllUsers);
router.get('/:id', GetLoggedInUser);
router.put('/:id', UpdateLoggedUser)

module.exports = router;

