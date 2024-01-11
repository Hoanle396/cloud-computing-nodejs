const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = require(".");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
});

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads/cloud-computing",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const cloudUpload = multer({
  storage: cloudStorage,
});

module.exports = { upload, cloudUpload };
