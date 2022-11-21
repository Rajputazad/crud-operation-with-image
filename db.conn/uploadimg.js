const multer = require("multer");
const fs = require("fs");
const path = require("path");


const uploadfile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./assets/imgs");
    },
    filename: (req, file, cb) => {
    //   console.log(file);
      const ext = path.extname(file.originalname);
      if (ext == ".jpg" || ext == ".png" || ext == ".jpeg") {
        cb(null, Date.now() + "--" + file.originalname);
        // console.log("file uploaded!");
      } else {
        console.log("unsupported format");
        cb(new Error("Only images are allowed"));
      }
    },
  }),
});

module.exports=uploadfile;