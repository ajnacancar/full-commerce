const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const router = express.Router();
const ShopModel = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { SHOP_TOKEN } = require("../config/static");
const { isAuthenticatedShop } = require("../middleware/auth");
const { sendMail } = require("../utils/sendMail");

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await ShopModel.findOne({ email });

    if (sellerEmail) {
      const fileName = req.file.filename;
      const filepath = `uploads/${fileName}`;

      fs.unlink(filepath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("Shop already exixst", 400));
    }

    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);

    const seller = {
      name: req.body.name,
      email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello, ${seller.name} please click on the link to activate your shop account: ${activationUrl}`,
      });

      res.status(200).json({
        success: true,
        message: `Please check your email: ${seller.email} to activate your shop account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate seller
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activationToken } = req.body;

      const newSeller = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await ShopModel.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Shop already exists", 400));
      }
      seller = await ShopModel.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendToken(seller, 201, SHOP_TOKEN, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login shop

router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields.", 400));
      }

      const shop = await ShopModel.findOne({ email }).select("+password");

      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exists!", 400));
      }

      const isPasswordValid = await shop.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler(
            "Something is wrong. Please provide correct information.",
            400
          )
        );
      }

      sendToken(shop, 200, SHOP_TOKEN, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  "/get-shop",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await ShopModel.findById(req.shop._id);

      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exists!", 400));
      }

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//logout shop
router.get(
  "/logout-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie(SHOP_TOKEN, null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Logout Shop Successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update profile shop picture
router.put(
  "/update-shop-avatar",
  isAuthenticatedShop,
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existShop = await ShopModel.findById(req.shop._id);

      const existAvatarPath = `uploads/${existShop.avatar}`;
      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const shop = await ShopModel.findByIdAndUpdate(req.shop._id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop information
router.put(
  "/update-shop-info",
  isAuthenticatedShop,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await ShopModel.findById(req.shop._id);

      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exist", 400));
      }

      shop.name = name;
      shop.phoneNumber = phoneNumber;
      shop.description = description;
      shop.address = address;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



// find shop by id
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await ShopModel.findById(req.params.id);

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
