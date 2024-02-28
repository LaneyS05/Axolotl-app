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
    host: process.env.DB_HOST,
    dialect: "postgres", // Or "mysql" for MySQL
    // Other options if needed
  }
);

// Import Sequelize models and configurations
const AxolotlModel = require("./Models/Axolotl")(sequelize); // Pass sequelize instance here

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/axolotl", require("./Controllers/axolotlController.js"));

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
