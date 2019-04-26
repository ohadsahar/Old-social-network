const validator = require("validator");
const bycrypt = require("bcryptjs");
const userUtil = require("../utils/userUtil.util");
const userSchema = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

async function ValidateRegisterInput(UserObject, req) {
    if (
      validator.isEmail(UserObject.email) &&
      validator.isLength(UserObject.password, 8) &&
      validator.isLength(UserObject.firstname, 2) &&
      validator.isLength(UserObject.lastname, 2) &&
      validator.isLength(UserObject.superhero, 4) &&
      validator.isLength(UserObject.quote, {min: 10, max: undefined})
    ) {
      UserObject.email = UserObject.email.toLowerCase();
      UserObject.password = await bycrypt.hash(UserObject.password, 10);
      const saveUserData = await userUtil.RegisterUser(UserObject, req);
      return {message: saveUserData.message}
  } else {
      const message = {
          UserSaved: null,
          success: false,
      }
    return {message: message}
  }
}
async function ValidateUserInputForUpdate(UserObject,id, req) {
    if (
        validator.isEmail(UserObject.email) &&
        validator.isLength(UserObject.password, 8) &&
        validator.isLength(UserObject.firstname, 2) &&
        validator.isLength(UserObject.lastname, 2) &&
        validator.isLength(UserObject.superhero, 4) &&
        validator.isLength(UserObject.quote, {min: 10, max: undefined})
      ) {
        const updateUser = await userUtil.UpdateUser(UserObject, id, req);
        return {message: updateUser.message}
      }
}
async function ValidateLoginInput(UserObject) {
    if (
      validator.isEmail(UserObject.email) &&
      validator.isLength(UserObject.password, 8)
    ) {
      UserObject.email = UserObject.email.toLowerCase();
      const Login = await ValidateLogin(UserObject);
      return {
        message: Login.message,
      };
    } else {
      return {
        message: Login.message
      };
    }
}
async function ValidateLogin(userObject) {
      const fetchedUser = await userSchema.findOne({ email: userObject.email });
      if (bycrypt.compare(userObject.password, fetchedUser.password)) {
        const token = jwt.sign(
          { email: fetchedUser.email, id: fetchedUser._id },
          "OHAD_SAHAR_SERIAL_KEY_NEVER_GONNA_GUESS_IT"
        );
        const message = {
            User: fetchedUser,
            id: fetchedUser._id, 
            token: token, 
            message: 'Login successful', 
            success: true
        }
        return {message: message}
      } else {
          const message = {
            User: null,
            id: null, 
            token: null, 
            message: 'Username or password is incorrect', 
            success: false
          }
          return {message: message}
      }
} 

  module.exports = {
    ValidateRegisterInput,
    ValidateLoginInput,
    ValidateLogin,
    ValidateUserInputForUpdate
}