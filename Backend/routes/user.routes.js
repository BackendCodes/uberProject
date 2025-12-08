const express = require("express");
const userRouter = express.Router();
const { body, validationResult } = require("express-validator");
const { registerUser } = require("../controllers/user.controller");

userRouter.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email address"),
  body("firstname")
    .isLength({ min: 3 })
    .withMessage("first name at least three char long"),
  body("lastname")
    .isLength({ min: 3 })
    .withMessage("first name at least three char long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 char long"),

  registerUser
);

module.exports = userRouter;
