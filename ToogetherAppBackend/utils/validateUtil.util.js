const validator = require("validator");
const bycrypt = require("bcryptjs");


async function validateLoginInput(userData) {
  if (validator.isEmail(userData.email) && validator.isLength(userData.password, 8)) {
    userData.email = userData.email.toLowerCase();
    return {userData: userData};
  } else {
    throw new Error(`validateUtil: validateLoginInput -  ${error}`);
  }
}
async function validateRegisterInput(userData) {
    if (validator.isEmail(userData.email) && validator.isLength(userData.password, 8) &&
      validator.isLength(userData.firstname, 2) && validator.isLength(userData.lastname, 2) &&
      validator.isLength(userData.superhero, 2)){
      userData.email = userData.email.toLowerCase();
      userData.password = await bycrypt.hash(userData.password, 10);
      return {userData: userData, success: true}
  } else {
    throw new Error(`validateUtil: validateRegisterInput - ${error}`);
  }
}
async function validateUpdateInput(userData) {

    if (userData.quote) {
      userData.quote = JSON.parse(userData.quote);
    }
    if(userData.Images)
    {
      userData.Images = JSON.parse(userData.Images);
    } else {
      userData.Images = null;
    }
    if (
      validator.isEmail(userData.email) && validator.isLength(userData.password, 8) &&
      validator.isLength(userData.firstname, 2) && validator.isLength(userData.lastname, 2) &&
      validator.isLength(userData.superhero, 4) && validator.isLength(userData.quote, {min: 10, max: undefined})
    ) {
      return {userData: userData};  
    } else {
      throw new Error (`validateUtil: validateUpdateInput - ${error}`);
    }
}



  module.exports = {
    validateLoginInput,
    validateUpdateInput,
    validateRegisterInput
}