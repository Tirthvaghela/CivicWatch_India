// This file is responsible for setting up the middleware for handling file uploads using Multer and Cloudinary. It configures Multer to use Cloudinary as the storage engine, specifying the folder where uploaded images will be stored and the allowed file formats. The configured Multer instance is then exported for use in routes where image uploads are required, such as when creating a new report with an associated image.

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "civicwatch_reports",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });

module.exports = upload;