const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const CouponeCodeModel = require("../model/coupon_code");
const { isAuthenticatedShop } = require("../middleware/auth");

//create coupon code
router.post(
  "/create-coupon-code",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponeCodeExists = await CouponeCodeModel.findOne({
        name: req.body.name,
      });

      if (isCouponeCodeExists) {
        return next(new ErrorHandler("Coupone code already exist", 400));
      }

      const couponCode = await CouponeCodeModel.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all coupons of shop
router.get(
  "/get-all-coupons-shop/:id",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupons = await CouponeCodeModel.find({
        shopId: req.params.id,
      });

      res.status(200).json({
        success: true,
        coupons,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponeCodeModel.findByIdAndDelete(
        req.params.id
      );

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponeCodeModel.findOne({
        name: req.params.name,
      });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
