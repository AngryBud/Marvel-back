const mongoose=require("mongoose");

const User = mongoose.model("User",
{
    email: {
      unique: true,
      type: String,
    },
    account: {
      username: {
        required: true,
        type: String,
      },
    },
    // favoris:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Fav",
    //     },
    // favoris: {
    //     type: Array,
    // },
    token: String,
    hash: String,
    salt: String,
  });

module.exports = User;