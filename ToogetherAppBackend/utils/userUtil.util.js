const express = require("express");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const userSchema = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

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

    return {
      message:
        "All data has been successfully verified, you will now be logged in",
      success: true,
      User: UserObject
    };
  } else {
    return {
      message:
        "There was a problem verifying the data you entered into the system, please try again",
      success: false,
      User: UserObject
    };
  }
}

async function RegisterUser(UserObject, req) {
  
  try {
    
    const url  = req.protocol + '://' + req.get('host');

    const UserToSave = new userSchema({
      email: UserObject.email,
      password: UserObject.password,
      firstname: UserObject.firstname,
      lastname: UserObject.lastname,
      superhero: UserObject.superhero,
      loggedin: false,
      Image: url + '/images/' + req.file.filename,
      quote: UserObject.quote,
      role: "admin"
    });

    await UserToSave.save();
    return {
      UserSaved: UserToSave,
      message:
        "The details have been verified and saved in the system, you are welcome to login.",
      success: true
    };
  } catch (error) {
    return {
      UserSaved: UserToSave,
      message:
        "The details have been verified but we were unable to register you, please try again later.",
      success: false
    };
  }
}

async function GetAllUsers() {
  try {
    const FetchAllUsers = await userSchema.find();
    return {
      Users: FetchAllUsers,
      message: "All users has been fetched successfully",
      success: true
    };
  } catch (error) {
    return {
      Users: FetchAllUsers,
      message: "There was a problem trying to fetch all users",
      success: false
    };
  }
}

async function ValidateUserInput(UserObject) {
  if (
    validator.isEmail(UserObject.email) &&
    validator.isLength(UserObject.password, 8)
  ) {
    UserObject.email = UserObject.email.toLowerCase();

    return {
      User: UserObject,
      message: "All data has been successfully verified.",
      success: true
    };
  } else {
    return {
      User: UserObject,
      message: "There was a problem trying to login, please try again.",
      success: true
    };
  }
}

async function LoginValidate(UserObject) {
  try {
   
    const FetchedUser = await userSchema.findOne({ email: UserObject.email });
    if (bycrypt.compare(UserObject.password, FetchedUser.password)) {
      const token = jwt.sign(
        { email: FetchedUser.email, id: FetchedUser._id },
        "SECRET_SHOULD_BE_SMALLER"
      );
      return {User: FetchedUser,id: FetchedUser._id, token: token, message: 'Login successful', success: true}
    }
  } catch (error) {
      return {message: 'Login failed, please try again in a few minutes.', success: false}

  }

}

async function UpdateUserLogStatus(id, action) 
{
  try {
    const ChangeLog = {

      loggedin: action,
    
    }
   
    await userSchema.updateOne({_id: id}, ChangeLog);
    return { message: 'The user is now logged on', success: true};
  
  } catch (error) {

    return { message: 'There was a problem connecting the user to the system and updated.', success: false}
    
  }

}

async function GetConnectedUser(id) {

  try {
      const UserObject = await userSchema.findById({_id: id}).then(documents => { 
        return documents;
      })
      return {UserData: UserObject, success: true, message:'User successfully imported'};
  } catch (error) {
    return {success: false, message:'There was a problem importing the user from the server'};
  }

}

async function UpdateUser(UserObject, id, req) {

  let NewData;
  UserObject.quote = JSON.parse(UserObject.quote);
    try {
      if (req.file) {
        const url  = req.protocol + '://' + req.get('host');
         NewData = {
          
          email: UserObject.email,
          password: UserObject.password,
          firstname: UserObject.firstname,
          lastname: UserObject.lastname,
          superhero: UserObject.superhero,
          loggedin: UserObject.loggedin,
          Image: url + '/images/' + req.file.filename,
          quote: UserObject.quote,
          role: UserObject.role
        }
      } else {

     
         NewData = {
          
          email: UserObject.email,
          password: UserObject.password,
          firstname: UserObject.firstname,
          lastname: UserObject.lastname,
          superhero: UserObject.superhero,
          loggedin: UserObject.loggedin,
          Image: UserObject.image,
          quote: UserObject.quote,
          role: UserObject.role
        }
      }
     
      await userSchema.updateOne({_id: id}, NewData);
      return {updatedUser: NewData, message: 'The user has been updated', success: true};    
    } catch (error) {
      return { message: 'There was a problem connecting the user to the system and updated.', success: false}
    }
  
  }

module.exports = {
  ValidateUser,
  RegisterUser,
  GetAllUsers,
  ValidateUserInput,
  LoginValidate,
  UpdateUserLogStatus,
  GetConnectedUser,
  UpdateUser,
};
