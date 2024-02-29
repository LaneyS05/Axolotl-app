require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "127.0.0.1", // Change to your PostgreSQL host
    dialect: "postgres",
  }
);

// Import Sequelize models and configurations
const AxolotlModel = require("./Models/Axolotl")(sequelize);

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const axolotlRouter = require("./Controllers/axolotlController.js");
app.use("/axolotl", axolotlRouter);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the PostgreSQL database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the PostgreSQL database:", err);
  });

// Synchronize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Models synced with the PostgreSQL database.");
  })
  .catch((err) => {
    console.error("Error syncing models with the PostgreSQL database:", err);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
