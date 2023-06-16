const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const EventModel = require("../model/event");
const ShopModel = require("../model/shop");
const { isAuthenticatedShop } = require("../middleware/auth");
const fs = require("fs");

//create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await ShopModel.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalida", 400));
      }

      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.shop = shop;

      const event = await EventModel.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all event of shop
router.get(
  "/get-all-events-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await EventModel.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete event of shop

router.delete(
  "/delete-shop-event/:id",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;

      const event = await EventModel.findById(eventId);
      if (!event) {
        return next(new ErrorHandler("Event not forund with this id!", 404));
      }

      event.images.forEach((imageUrl) => {
        const fileName = imageUrl;
        const filePath = `uploads/${fileName}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
      });

      const eventData = await EventModel.findByIdAndDelete(eventId);

      res.status(201).json({
        success: true,
        message: "Event deleted successufuly",
        id: eventData.id,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events
router.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allEvents = await EventModel.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        allEvents,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
