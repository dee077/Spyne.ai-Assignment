const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const cloudinary = require("cloudinary").v2;

const saltRounds = 10;

// Helper function to validate user data
const validateSignUpData = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name.trim().length) {
    res.status(400).json({ message: "Please enter a valid name" });
    return false;
  }

  if (!isEmail(email)) {
    res.status(400).json({ message: "Please enter a valid email address" });
    return false;
  }

  if (!password.trim().length) {
    res.status(400).json({ message: "Please enter a password" });
    return false;
  }

  if (password.trim().length <= 5) {
    res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
    return false;
  }

  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    res.status(400).json({ message: "Email is already registered" });
    return false;
  }

  return true;
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file;

  const isValid = await validateSignUpData(req, res);
  if (!isValid) return;

  try {
    const uploadResult = await cloudinary.uploader.upload(image.path);
    const imageId = uploadResult.public_id;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      imageId,
    });

    const jwtToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        imageId: user.imageId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Account created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        imageId: user.imageId,
        userType: user.userType,
      },
      jwtToken,
    });
  } catch (error) {
    console.error(`Error during signup: ${error}`);
    res.status(500).json({ message: "Server error during signup" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email does not exist, please sign up first" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const jwtToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        imageId: user.imageId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        imageId: user.imageId,
      },
      jwtToken,
    });
  } catch (error) {
    console.error(`Error during login: ${error}`);
    res.status(500).json({ message: "Server error during login" });
  }
};
