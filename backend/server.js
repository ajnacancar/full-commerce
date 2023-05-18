const app = require("./app");
const connectDatabase = require("./db/database");

// handling uncauth exception

process.on("uncaughtException", (err) => {
  console.log("Error ", err.message);
  console.log("Shutting down server for handeling uncaught exception");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

//connect to db

connectDatabase();

//cerate server
const server = app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT ", process.env.PORT);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("Error ", err.message);
  console.log("Shutting down server for handeling error");

  server.close(() => {
    process.exit(1);
  });
});
