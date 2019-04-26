
const userSchema = require("../models/UserSchema");

async function RegisterUser(UserObject, req) {
    let UserToSave;
    const url  = req.protocol + '://' + req.get('host');
    UserObject.quote = JSON.parse(UserObject.quote);
    UserToSave = new userSchema({
      email: UserObject.email,
      password: UserObject.password,
      firstname: UserObject.firstname,
      lastname: UserObject.lastname,
      superhero: UserObject.superhero,
      loggedin: false,
      Image: url + '/images/' + req.file.filename,
      quote: UserObject.quote,
      Images: null,
      role: "admin"
    });
    await UserToSave.save();
    const message = {
      UserSaved: UserToSave,
      success: true
    }
    return {message: message} 
  } 
async function GetAllUsers() {
    const FetchAllUsers = await userSchema.find();
    const message = {
      Users: FetchAllUsers,
      success: true,
    }
    return { message: message };
  } 
async function UpdateUserLogStatus(id, action) {
    const ChangeLog = {
      loggedin: action,
    }
    await userSchema.updateOne({_id: id}, ChangeLog);
    const message = {
      success: true
    }
    return {message: message }
}
async function GetConnectedUser(id) {
     

      const userObject = await userSchema.findById({_id: id}).select("email password firstname lastname superhero loggedin Image quote role");
      const allImages = await userSchema.findById({_id: id}).select("Images");
     
      const message = {
          UserObject: userObject,
          allImages: allImages,
          success: true
      }
      return {message: message};
  } 

async function getImagesOnly(req) {
  const pageSize =+ req.query.pagesize;
  const currentPage = req.query.page;
  let imageQuery;
  if (currentPage && pageSize) {
    imageQuery = await userSchema.findById({_id: req.params.id}).select("Images").where('Images')
    .slice((pageSize * (currentPage -1)), pageSize);
    const message = {
      userImage: imageQuery.Images,
      success: true
    }
    return {message: message}
  }
}
async function UpdateUser(UserObject, id, req) {
  let NewData;
  UserObject.quote = JSON.parse(UserObject.quote);
  if (UserObject.Images)
  {
     UserObject.Images = JSON.parse(UserObject.Images);
  } else {
    UserObject.Images = null;
  }
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
          Images: UserObject.Images,
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
          Images: UserObject.Images,
          role: UserObject.role
        }
      }
      await userSchema.updateOne({_id: id}, NewData);
      const message = {
        UserObject: NewData,
        success: true
      }
      return {message: message};    
    } 
async function UpdateCollection(req, id) {
    const ArrayImg = [];
    let NewData;
      if (req.files) {

        const url  = req.protocol + '://' + req.get('host');
        req.files.forEach(element => {
          ArrayImg.push(url + '/images/' + element.filename)
        });
        NewData = {
          Images: ArrayImg,
        }
        let imagesAfterUpdate = await userSchema.findById({_id: id});
        if (imagesAfterUpdate.Images)
        {
   
        await userSchema.findByIdAndUpdate({_id: id}, {$addToSet:{Images:NewData.Images}});
        } else {
          await userSchema.findByIdAndUpdate({_id: id}, {Images: NewData.Images});
          
        }
         imagesAfterUpdate = await userSchema.findById({_id: id});
        const message = {
          Images: imagesAfterUpdate.Images,
          success: true
        }
        return { message: message };
      }  else {
        const message = {
          Images: ArrayImg,
          success: false
        }
        return { message: message };
      }
    } 
  
module.exports = {
  RegisterUser,
  GetAllUsers,
  UpdateUserLogStatus,
  GetConnectedUser,
  UpdateUser,
  UpdateCollection,
  getImagesOnly
};
