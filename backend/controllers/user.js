const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const router = express.Router();
const UserModel = require("../model/user.js");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

//create new user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await UserModel.findOne({ email });

  if (userEmail) {
    const fileName = req.file.filename;
    const filepath = `uploads/${fileName}`;

    fs.unlink(filepath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting file" });
      }
    });
    return next(new ErrorHandler("User already exixst", 400));
  }

  const fileName = req.file.filename;
  const fileUrl = path.join(fileName);

  const user = {
    name,
    email,
    password,
    avatar: fileUrl,
  };

  const activationToken = createActivationToken(user);

  const activationUrl = `http://localhost:3000/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello, ${user.name} please click on the link to activate your account: ${activationUrl}`,
    });

    res.status(200).json({
      success: true,
      message: `Please check your email: ${user.email} to activate your account`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation tokne
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activationToken } = req.body;

      const newUser = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await UserModel.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await UserModel.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login user
router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields.", 400));
      }

      const user = await UserModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler(
            "Something is wrong. Please provide correct information.",
            400
          )
        );
      }

      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//logout user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Logout Successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
