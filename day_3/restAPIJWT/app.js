const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect(
  process.env.DATABASE_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database.")
);

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const addItemRouter = require("./routes/addItem");
const cartRouter = require("./routes/cart");

const app = express();

// Commented out due to only focusing on back-end therefore, there is no need for front-end pugs
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route middlewares
app.use("/", indexRouter);
app.use("/", loginRouter);
app.use("/", registerRouter);
app.use("/", addItemRouter);
app.use("/", cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
