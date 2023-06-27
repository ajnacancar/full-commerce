const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const OrderModel = require("../model/order");
const { isAuthenticated, isAuthenticatedShop } = require("../middleware/auth");
const ProductModel = require("../model/product");
const order = require("../model/order");
const {
  ORDER_STATUS_TRANSFER_TO_DELIVERY_PARTNET,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_REFUND_SUCCESS,
} = require("../config/static");
const product = require("../model/product");

// create new order
router.post(
  "/create-order",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
      // group card items by shopId

      const shopItemsMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;

        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }

        shopItemsMap.get(shopId).push(item);
      }

      // create order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await OrderModel.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await OrderModel.find({
        "user._id": req.params.userId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all order of shop
router.get(
  "/get-shop-all-orders/:shopId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await OrderModel.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        shopOrders: orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// update order status
router.put(
  "/upadte-order-status/:id",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await OrderModel.findById(req.params.id);

      if (!order) {
        next(new ErrorHandler("Order not found with this id!", 400));
      }

      if (req.body.status === ORDER_STATUS_TRANSFER_TO_DELIVERY_PARTNET) {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty, false);
        });
      }
      order.status = req.body.status;

      if (req.body.status == ORDER_STATUS_DELIVERED) {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

async function updateOrder(id, qty, isRefund) {
  const product = await ProductModel.findById(id);

  if (isRefund) {
    product.stock += qty;
    product.sold_out -= qty;
  } else {
    product.stock -= qty;
    product.sold_out += qty;
  }
  await product.save({ validateBeforeSave: false });
}

// give a refund
router.put(
  "/order-refund/:id",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await OrderModel.findById(req.params.id);

      if (!order) {
        next(new ErrorHandler("Order not found with this id!", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// accept the refund
router.put(
  "/order-refund-success/:id",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await OrderModel.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id.", 404));
      }

      order.status = req.body.status;

      if (req.body.status === ORDER_STATUS_REFUND_SUCCESS) {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty, true);
        });
      }

      order.save();
      res.status(200).json({
        success: true,
        message: "Order refund true",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
