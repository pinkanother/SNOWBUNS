const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const indexRouter = require("./src/routes/index");
const apiRouter = require("./src/routes/api");
const apiResponse = require("./src/helpers/apiResponse");
const cors = require("cors");

// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      // console.log("App is running at port", process.env.PORT);
      console.log("Connected to %s", MONGODB_URL);
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });
const db = mongoose.connection;

const app = express();

//don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(res, "Page not found");
});

// throw 404 if URL not found

app.use((err, req, res) => {
  if (err.name == "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
