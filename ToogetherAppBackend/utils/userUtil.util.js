const userSchema = require("../models/userSchema");
const bycrypt = require("bcryptjs");  
const jwt = require("jsonwebtoken");

async function registerUser(userData, req) {

    const url  = req.protocol + '://' + req.get('host');
    userData.quote = JSON.parse(userData.quote);
    const user = new userSchema({
      email: userData.email,password: userData.password,
      firstname: userData.firstname,lastname: userData.lastname,
      superhero: userData.superhero,loggedin: false,
      Image: url + '/images/' + req.file.filename,quote: userData.quote,
      Images: null,role: "admin"
    });
    await user.save();
    return {userData: user,success: true}
} 
async function fetchAllUsers() {
    const fetchedUsers = await userSchema.find();
    if (fetchedUsers) {
        return {users: fetchedUsers,success: true}
    } else {
      throw new Error(`userUtil: fetchAllUsers - ${error}`)
    }
} 
async function updateUser(userData, id, req) {
      let newData;
      if (req.file) {
          newData = createObjectWithNewProfileImage(req,userData).user;
      } else {
          newData = createObjectWithoutProfileImage(userData).user;
      }
      await userSchema.updateOne({_id: id}, newData);
      return {userData: newData, success: true};    
} 
async function login(userData) {
  const fetchedUser = await userSchema.findOne({ email: userData.email });
  if (bycrypt.compare(userData.password, fetchedUser.password)) {
    const token = jwt.sign(
      { email: fetchedUser.email, id: fetchedUser._id },"OHAD_SAHAR_SERIAL_KEY_NEVER_GONNA_GUESS_IT",
      {expiresIn: "1h"}
    );
    const userData = {
        user: fetchedUser,
        id: fetchedUser._id,  token: token, expiresIn: 3600, message: 'Login successful', success: true
    }
    return {userData: userData}
  } 
     
}
async function getImagesOnly(req, id) {

  const pageSize =+ req.query.pagesize;
  const currentPage = req.query.page;
  let imageQuery;
  if (currentPage && pageSize) {
    imageQuery = await userSchema.findById({_id: req.params.id}).select("Images").where('Images')
    .slice((pageSize * (currentPage -1)), pageSize);
     return imageQuery.Images;
  } else {
    throw new Error(`userUtil: getImagesOnly - no pagesize and number of page ${error}`);
  }
}
async function getConnectedUserValues(id) {

    const resultUserValues = await userSchema.findById({_id: id}).select("email password firstname lastname superhero loggedin Image quote role");
    if(resultUserValues) {
      return resultUserValues;
    } else {
      throw new Error(`userUtil: getConnectedUserValues - Error: ${error}`);
    }
}
async function getAllImagesOfConnectedUser(id) {
  const resultOfFetchedImages = await userSchema.findById({_id: id}).select("Images");
  if (resultOfFetchedImages) {
    return resultOfFetchedImages;
  } else {
    throw new Error(`userUtil: getAllImagesOfConnectedUser - Error: ${error}`);
  }
}
async function updateCollection(req, id) {
  let ArrayImg = [];
  let finalArrayOfImages = [];
  const imageCollection = await userSchema.findById({_id: id}).select("Images.imagename");
    if (req.files) {
      const url  = req.protocol + '://' + req.get('host');
      req.files.forEach(element => {
        ArrayImg.push({imagename: url + '/images/' + element.filename})
      });
      if (imageCollection.Images) {
        finalArrayOfImages = [...ArrayImg, ...imageCollection.Images];  
      
          await userSchema.findOneAndUpdate({_id: id}, {$set: {Images:finalArrayOfImages}}, {upsert: true });
          const message = {
            Images: finalArrayOfImages,
            success: true
          }
          return { message: message };
    } else {
          await userSchema.findByIdAndUpdate({_id: id}, {Images: ArrayImg});
          const message = {
            Images: ArrayImg,
            success: true
          }
          return { message: message };
         }
    } 
} 
function createObjectWithNewProfileImage(req, userData) {

  const url  = req.protocol + '://' + req.get('host');
  const newUserData = {
   email: userData.email,
   password: userData.password,
   firstname: userData.firstname,
   lastname: userData.lastname,
   superhero: userData.superhero,
   loggedin: userData.loggedin,
   Image: url + '/images/' + req.file.filename,
   quote: userData.quote,
   Images: userData.Images,
   role: userData.role
 }

 return {user: newUserData};

}
function createObjectWithoutProfileImage(userData) {

  const newUserData = { 
    email: userData.email,
    password: userData.password,
    firstname: userData.firstname,
    lastname: userData.lastname,
    superhero: userData.superhero,
    loggedin: userData.loggedin,
    Image: userData.image,
    quote: userData.quote,
    Images: userData.Images,
    role: userData.role
  }
  return {user: newUserData}
}

module.exports = {
  registerUser,
  fetchAllUsers,
  updateUser,
  login,
  updateCollection,
  getImagesOnly,
  getAllImagesOfConnectedUser,
  getConnectedUserValues,
  createObjectWithNewProfileImage,
  createObjectWithoutProfileImage,
};
