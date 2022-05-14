const mongoose = require("mongoose");

const Favori = mongoose.model("Favori", {
  name: String,
  description: String,
//   fav_price: Number,
//   fav_details: Array,
  image: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favori;