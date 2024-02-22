const mongoose = require("mongoose");

const AxololtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pic: { type: String },
  local: { type: String },
  habitat: { type: String, required: true },
  discoverd: { type: Number, required: true },
});

module.exports = mongoose.model("Axolotle", AxololtSchema);
