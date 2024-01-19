const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    prodname: String,
    raiting: String,
    like: Number,
    detail: String,
    imagecard: String,
  },
  {
    collection: "Users",
    timestamps: true,
  }
);

const Users = mongoose.model("Users", schema);

module.exports = Users;
