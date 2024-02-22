const mongoose = require("mongoose");

const AxololtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discoverd: { type: Number, required: true },
  habitat: {
    type: String,
    required: true,
  },
  local: { type: String },
  pic: { type: String },
});

module.exports = mongoose.model("Axolotle", AxololtSchema);
