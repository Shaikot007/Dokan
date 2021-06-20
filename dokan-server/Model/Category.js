const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  product_icon: String,
  product_category: String
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
