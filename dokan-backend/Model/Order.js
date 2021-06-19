const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user_name: String,
  user_email: String,
  user_phone_number: String,
  address: String,
  post_office: String,
  police_station: String,
  city: String,
  zip: String,
  country: String,
  date: String,
  time: String,
  user_order: Object
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
