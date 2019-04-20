const multer  = require('multer');
const path = require("path");

 function ConfigMulter() {

   const storage = multer.diskStorage({
        destination: 'assets/images',
        filename: function(req, file ,cb) {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
      });

      const multerStorage = multer({ storage: storage}).single('image');

      return {upload: multerStorage};
}

function ConfigMulterMultiImages () {

  
  const storage = multer.diskStorage({
    destination: 'assets/images',
    filename: function(req, file ,cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const multerStorage = multer({ storage: storage}).array("uploads[]", 12);

  return {upload: multerStorage};

}

module.exports = {

    ConfigMulter,
    ConfigMulterMultiImages
}