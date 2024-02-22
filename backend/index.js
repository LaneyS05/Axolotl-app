// DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
const axolotlController = require("./Controllers/axolotlController.js");
const mongoose = require("mongoose");
const dbconnect = require("./Modles/Axolotl.js"); //'express-react-views'

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const MONGO_URI = process.env.MONGO_URI;

// MIDDLEWARE
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Places
app.use("/axoltl", axolotlController);

// ROUTES
app.get("/", (req, res) => {
  res.render("home");
});

app.get("*", (req, res) => {
  res.render("error404");
});

const start = async () => {
  try {
    await dbconnect();
  } catch (e) {
    console.log("error");
  }

  // db connection
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("db connected"))
    .catch((err) => console.error(err));

  // LISTEN
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
};
start();

module.exports = app;
