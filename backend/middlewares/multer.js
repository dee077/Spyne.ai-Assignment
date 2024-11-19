const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Cloudinary storage with file size limits
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "car-management",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Set file size limit to 5MB
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 10,  // Max 10 files
  }, // 5 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(file.mimetype);
    if (extName) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .jpg, or .png formats are allowed"));
    }
  },
});

module.exports = upload;
