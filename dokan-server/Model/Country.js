const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  product_country: String
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
