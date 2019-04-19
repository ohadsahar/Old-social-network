const multer  = require('multer');

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

module.exports = {

    ConfigMulter
}