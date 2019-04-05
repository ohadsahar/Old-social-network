const express = require("express");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const userSchema = require("../models/UserSchema");

async function ValidateUser(UserObject) {
  
  if (
    validator.isEmail(UserObject.email) &&
    validator.isLength(UserObject.password, 8) &&
    validator.isLength(UserObject.firstname, 2) &&
    validator.isLength(UserObject.lastname, 2) &&
    validator.isLength(UserObject.superhero, 4)
  ) {
      UserObject.email = UserObject.email.toLowerCase();
      UserObject.password = await bycrypt.hash(UserObject.password, 10);

    return {message: 'All data has been successfully verified, you will now be logged in', success: true, User: UserObject}
  } else {
    return {message: 'There was a problem verifying the data you entered into the system, please try again', success: false, User: UserObject}
  }
}

async function RegisterUser(UserObject) 
{
    try {
        const UserToSave = new userSchema({

            email: UserObject.email,
            password: UserObject.password,
            firstname: UserObject.firstname,
            lastname: UserObject.lastname,
            superhero: UserObject.superhero,
            loggedin: false,
            role: 'admin'
    });

    await UserToSave.save();
    return {UserSaved: UserToSave, message: 'The details have been verified and saved in the system, you are welcome to login.', success: true}

    } catch (error) {
        return {UserSaved: UserToSave, message: 'The details have been verified but we were unable to register you, please try again later.', success: false }
    }
   
}

module.exports = {
  ValidateUser,
  RegisterUser
};
