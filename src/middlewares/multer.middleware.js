import multer from "multer";
// multer is a middleware used for handling file uploads.
// It helps receive files sent from forms or frontend apps.

const storage = multer.diskStorage({ 
  //  “Store uploaded files on disk (inside folders).”
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})