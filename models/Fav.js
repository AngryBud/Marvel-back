const mongoose = require("mongoose");

const Favori = mongoose.model("Favori", {
  name: String,
  description: String,
  image: String,
  owner: String
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
});

module.exports = Favori;