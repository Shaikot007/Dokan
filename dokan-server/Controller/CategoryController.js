const Category = require("../Model/Category");

async function categoryCreateController(req, res) {
  try {
    const productIcon = req.body.product_icon;
    const category = req.body.product_category;

    const categorySave = new Category({
      product_icon: productIcon,
      product_category: category
    });

    const categoryCreateAndSave = await categorySave.save();

    res.json({ category: categoryCreateAndSave });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  };
};

async function categoryListController(req, res) {
  try {
    const category_list = await Category.find({}).sort({product_category: 1}).select("_id product_icon product_category");
    res.send(category_list);
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  };
};

module.exports = {
  categoryCreateController, categoryListController
};
