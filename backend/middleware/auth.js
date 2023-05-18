const ErrorHandler = require("../utils/ErrorHandler");
const catchasyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");

const catchAsyncErrors = require("./catchAsyncErrors");
const UserModel = require("../model/user");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await UserModel.findById(decoded.id);
  next();
});
