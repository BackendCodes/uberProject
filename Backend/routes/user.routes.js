const express = require("express");
const userRouter = express.Router();
const { body, validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/user.controller");


// User Registration Route
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


// User Login Route
userRouter.post('/login',
    body('email').isEmail().withMessage("Invalid email address"),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 char long')
  ,loginUser)



module.exports = userRouter;
