const mongoose = require("mongoose");

const newsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
  },
});

module.exports = mongoose.model("Newsletter", newsLetterSchema);
