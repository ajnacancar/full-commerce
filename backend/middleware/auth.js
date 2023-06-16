const ErrorHandler = require("../utils/ErrorHandler");
const catchasyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");

const catchAsyncErrors = require("./catchAsyncErrors");
const UserModel = require("../model/user");
const ShopModel = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await UserModel.findById(decoded.id);
  next();
});

exports.isAuthenticatedShop = catchAsyncErrors(async (req, res, next) => {
  const { shop_token } = req.cookies;

  if (!shop_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(shop_token, process.env.JWT_SECRET_KEY);

  req.shop = await ShopModel.findById(decoded.id);
  next();
});
