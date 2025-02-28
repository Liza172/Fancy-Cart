const mongoose = require("mongoose");

mongoose.connect("mongondb:/127.0.0.1:27017/fakeProduct");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password : String,
  cart : {
    type : Array,
    default : [],
  },
  orders : {
    type: Array,
    default : [],
  },
  contact : Number,
  picture : String,

});

module.exports = mongoose.model("user", userSchema);
