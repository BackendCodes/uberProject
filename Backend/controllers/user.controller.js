const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const logger = require("../lib/logger");
const log = logger.child({ label: "user.controller.js" });

// register User
const registerUser = async (req, res) => {

  console.log(req.body);
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;

  try {
    const hashpwd = await userModel.hashPassword(password);

    const user = await userService({
      firstname,
      lastname,
      email,
      password: hashpwd,
    });

    const token = await user.generateAuthToken();

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    log.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// login user
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // check UserExist
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = await user.generateAuthToken();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      })
      .status(200)
      .json({
        token,
        user,
      });
  } catch (error) {
    log.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get User Profile
const UserProfile = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  UserProfile,
};
