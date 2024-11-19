const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();
const upload = require("../middlewares/multer");

router.post("/signup", upload.single("image"), registerUser);
router.post("/login", loginUser);

module.exports = router;
