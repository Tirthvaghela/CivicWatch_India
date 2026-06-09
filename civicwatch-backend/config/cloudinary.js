//This file is responsible for configuring the Cloudinary service, which is used for handling image uploads in the application. It imports the Cloudinary library, sets up the configuration using environment variables for the cloud name, API key, and API secret, and then exports the configured Cloudinary instance for use in other parts of the application where image uploads are needed.

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

console.log(process.env.CLOUDINARY_NAME);
console.log(process.env.CLOUDINARY_KEY);

module.exports = cloudinary;