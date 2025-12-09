const express = require("express");
const userRouter = express.Router();
const { body, validationResult } = require("express-validator");
const { registerUser, loginUser, UserProfile } = require("../controllers/user.controller");
const authUser = require("../middlewares/auth.middleware");


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
  



  // user Profile Route
  userRouter.get('/profile',authUser,UserProfile)

  // user logout router
  userRouter.get('/logout', authUser, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  });



module.exports = userRouter;
