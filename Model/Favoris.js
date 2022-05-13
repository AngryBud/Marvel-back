const mongoose = require("mongoose");

const Favori = mongoose.model("Favori", {
  product_name: String,
  product_description: String,
  product_img: String,
//   product_image: { type: mongoose.Schema.Types.Mixed, default: {} },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favori;