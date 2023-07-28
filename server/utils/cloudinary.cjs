const cloudinary = require("cloudinary");

// Configure Cloudinary with your API credentials
cloudinary.v2.config({
  cloud_name: 'dh9wfvmd5',//process.env.CLOUDINARY_CLOUD_NAME,
  api_key: '857653887662554',//process.env.CLOUDINARY_API_KEY,
  api_secret:'SDE-DjdWcXS0Jt71vA98oy4sSzE',// process.env.CLOUDINARY_API_SECRET,
  secure: true
});


module.exports= cloudinary;
