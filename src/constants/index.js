require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
};
