const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const stripe = require("stripe")("sk_test_51L5BNeGt9MqMS2K8un2HMy9IUxHPUTR3Url4jGnhV02UrnlawiqFPxdp7aXtqypPh3ZcV1EUOPrYJOj6ZrofVhX200aCfs8X8i");

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const mypayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "Ajna's shop",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: mypayment.client_secret,
    });
  })
);

router.get(
  "/stripe-api-key",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
  })
);

module.exports = router;
