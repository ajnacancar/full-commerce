const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const MessageModel = require("../model/messages");
const { upload } = require("../multer");

// create new message
router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;
      if (req.files) {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.fileName}`);
        messageData.images = imageUrls;
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text

      const message = new MessageModel({
        conversationId: messageData.conversationId,
        sender: messageData.sender,
        text: messageData.text,
        images: messageData.images ? messageData.images : null,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all messages with conversationId
router.get("/get-all-messages/:id", catchAsyncErrors(async (req, res, next) =>{
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.id
    })

    res.status(200).json({
      success: true,
      messages
    })
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}))

module.exports = router;
