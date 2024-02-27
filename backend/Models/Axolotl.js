const mongoose = require("mongoose");

const AxolotlSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pic: { type: String },
  location: { type: String },
  habitat: { type: String, required: true },
  discovered: { type: Number, required: true },
});

module.exports = mongoose.model("Axolotl", AxolotlSchema);
