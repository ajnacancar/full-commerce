const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plase enter your product name."],
  },

  description: {
    type: String,
    required: [true, "Plase enter your product description."],
  },

  category: {
    type: String,
    required: [true, "Plase enter your product category."],
  },

  tags: {
    type: String,
    // required: [true, "Plase enter your product tags."],
  },

  originalPrice: {
    type: Number,
  },

  discountPrice: {
    type: Number,
    required: [true, "Plase enter your product price with discount."],
  },

  stock: {
    type: Number,
    required: [true, "Plase enter your product stock."],
  },

  images: [
    {
      type: String,
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
