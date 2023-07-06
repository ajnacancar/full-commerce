const express = require("express");
const router = express.Router();
const ProductModel = require("../model/product");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const ShopModel = require("../model/shop");
const OrderModel = require("../model/order");
const { isAuthenticatedShop, isAuthenticated } = require("../middleware/auth");
const fs = require("fs");

//create product
router.post(
  "/create-product",
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
      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const product = await ProductModel.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all product of shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await ProductModel.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete product of shop

router.delete(
  "/delete-shop-product/:id",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const product = await ProductModel.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not forund with this id!", 404));
      }

      product.images.forEach((imageUrl) => {
        const fileName = imageUrl;
        const filePath = `uploads/${fileName}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
      });

      const productData = await ProductModel.findByIdAndDelete(productId);

      res.status(201).json({
        success: true,
        message: "Product deleted successufuly",
        id: productData.id,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await ProductModel.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { rating, comment, productId, orderId } = req.body;

      const product = await ProductModel.findById(productId);

      const isReviewd = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewd) {
        product.reviews.forEach((rev) => {
          if (rev.user._id == req.user._id) {
            rev.rating = rating;
            rev.comment = comment;
            rev.user = req.user;
          }
        });
      } else {
        product.reviews.push({ rating, comment, user: req.user });
      }

      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await OrderModel.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Review added!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// best sellings
router.get(
  "/best-selling-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      let products = await ProductModel.find();
      const p = products
        .sort((a, b) => {
          return b.sold_out - a.sold_out;
        })
        .slice(0, 10);

      res.status(200).json({
        success: true,
        products: p,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// best deals products
router.get(
  "/best-deals-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      let products = await ProductModel.find();
      const p = products
        .sort((a, b) => {
          return b.ratings - a.ratings;
        })
        .slice(0, 5);

      res.status(200).json({
        success: true,
        products: p,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// featured products
router.get(
  "/featured-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await ProductModel.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
