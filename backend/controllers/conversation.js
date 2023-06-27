const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const ConversationModel = require("../model/conversation");
const { isAuthenticatedShop, isAuthenticated } = require("../middleware/auth");

//create convesration
router.post(
  "/create-new-conversation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, shopId } = req.body;
      const isConversationExists = await ConversationModel.findOne({
        groupTitle,
      });

      if (isConversationExists) {
        res.status(200).json({
          success: true,
          conversation: isConversationExists,
        });
      } else {
        const conversation = await ConversationModel.create({
          members: [userId, shopId],
          groupTitle: groupTitle,
        });

        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get shop conversation
router.get(
  "/get-all-conversation-shop/:id",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await ConversationModel.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get user conversation
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await ConversationModel.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// update the last message
router.put(
  "/update-last-message/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await ConversationModel.findByIdAndUpdate(
        req.params.id,
        {
          lastMessage,
          lastMessageId,
        }
      );

      res.status(200).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
