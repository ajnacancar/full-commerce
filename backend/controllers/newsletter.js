const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const NewsletterModel = require("../model/newsletter");
const { sendMailNewsletter } = require("../utils/sendMail");

//subscribe to nesletter
router.post(
  "/subscribe-to-newsletter",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isEmailExists = await NewsletterModel.findOne({
        email: req.body.email,
      });

      if (isEmailExists) {
        return next(
          new ErrorHandler("Email is already subscribed to newsletter.", 400)
        );
      }

      const nesletter = await NewsletterModel.create({ email: req.body.email });

      res.status(201).json({
        success: true,
        nesletter,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//subscribe to nesletter
router.get(
  "/send-newsletter",
  catchAsyncErrors(async (req, res, next) => {
    try {
      await sendMailNewsletter({
        email: "ajna.cancar2019@size.ba",
        subject: "New products are comming",
      });

      res.status(200).json({
        success: true,
        message: `email sent`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
