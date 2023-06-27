const express = require("express");
const ErrorHandler = require("./middleware/Error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// import routes
const user = require("./controllers/user");
const shop = require("./controllers/shop");
const product = require("./controllers/product");
const event = require("./controllers/event");
const coupon = require("./controllers/coupon_code");
const payment = require("./controllers/payment");
const order = require("./controllers/order");
const conversation = require("./controllers/conversation");
const message = require("./controllers/message");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);

//error handeling
app.use(ErrorHandler);

module.exports = app;
