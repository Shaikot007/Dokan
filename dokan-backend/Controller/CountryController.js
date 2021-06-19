const Country = require("../Model/Country");

async function countryCreateController(req, res) {
  try {
    const country = req.body.product_country;

    const countrySave = new Country({
      product_country: country
    });

    const countryCreateAndSave = await countrySave.save();

    res.json({ country: countryCreateAndSave });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  };
};

async function countryListController(req, res) {
  try {
    const country_list = await Country.find({}).sort({product_country: 1}).select("_id product_country");
    res.send(country_list);
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  };
};

module.exports = {
  countryCreateController, countryListController
};
