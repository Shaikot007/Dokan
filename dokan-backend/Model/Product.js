const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema ({
  product_name: String,
  product_image: String,
  product_weight: String,
  product_price: Number,
  product_currency: String,
  product_country: String,
  product_details: String,
  order_quantity: Number,
  product_category: String,
  delivery_image: String,
  delivery_text: String,
  cash_image: String,
  cash_text: String,
  payment_text: String,
  american_express_image: String,
  master_card_image: String,
  visa_card_image: String,
  bcash_image: String
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
