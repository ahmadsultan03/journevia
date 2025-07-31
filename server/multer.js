import multer from 'multer';
import path from 'path';

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/');
  },

  filename: function(req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname))  // unique filename)
  },
});

// file filter for image uploads
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true); // accept the file
    } else {
        cb(new Error("Invalid file type. Only images are allowed."), false); // reject the file
    }
    };

// Initialize multer instance

const upload = multer({storage, fileFilter});

export default upload;

