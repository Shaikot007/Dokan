const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  user_name: String,
  user_email: String,
  user_password: String,
  user_phone_number: String,
  address: String,
  post_office: String,
  police_station: String,
  city: String,
  zip: String,
  country: String
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
