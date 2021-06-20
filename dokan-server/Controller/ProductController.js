const Product = require("../Model/Product");

async function productCreateController(req, res) {
  try {
    const productName = req.body.product_name;
    const productImage = req.body.product_image;
    const productWeight = req.body.product_weight;
    const productPrice = req.body.product_price;
    const currency = req.body.product_currency;
    const country = req.body.product_country;
    const productDetails = req.body.product_details;
    const orderQuantity = req.body.order_quantity;
    const category = req.body.product_category;
    const delivery_image = req.body.delivery_image;
    const delivery_text = req.body.delivery_text;
    const cash_image = req.body.cash_image;
    const cash_text = req.body.cash_text;
    const payment_text = req.body.payment_text;
    const american_express_image = req.body.american_express_image;
    const master_card_image = req.body.master_card_image;
    const visa_card_image = req.body.visa_card_image;
    const bcash_image = req.body.bcash_image;

    const productSave = new Product({
      product_name: productName,
      product_image: productImage,
      product_weight: productWeight,
      product_price: productPrice,
      product_currency: currency,
      product_country: country,
      product_details: productDetails,
      order_quantity: orderQuantity,
      product_category: category,
      delivery_image: delivery_image,
      delivery_text: delivery_text,
      cash_image: cash_image,
      cash_text: cash_text,
      payment_text: payment_text,
      american_express_image: american_express_image,
      master_card_image: master_card_image,
      visa_card_image: visa_card_image,
      bcash_image: bcash_image
    });

    const productCreateAndSave = await productSave.save();

    res.json({ product: productCreateAndSave });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

async function productListController(req, res) {
  try {
    let query = {};
    let sortBy = {};

    const {
      product_name,
      product_category,
      min_price,
      max_price,
      product_country,
      sort_by,
      page,
      limit
    } = req.query;

    //For products filter
    if(product_name !== undefined) {
      const regex = new RegExp(product_name, "i");
      query = { ...query, product_name: regex };
    }

    if(product_category !== undefined) {
      query = { ...query, product_category: product_category };
    }

    if(min_price !== undefined && max_price !== undefined) {
      query = { ...query, product_price: { $gte: min_price, $lte: max_price }};
    }

    if(min_price !== undefined && max_price === undefined) {
      query = { ...query, product_price: { $gte: min_price }};
    }

    if(min_price === undefined && max_price !== undefined) {
      query = { ...query, product_price: { $lte: max_price }};
    }

    if(product_country !== undefined) {
      query = { ...query, product_country: product_country };
    };

    //For products sort
    if(sort_by === undefined || sort_by === "name") {
      sortBy = { product_name: 1 }
    }

    if(sort_by === "price") {
      sortBy = { product_price: 1 }
    };

    const products_list = await Product
      .find(query)
      .limit(parseInt(limit))
      .skip(((parseInt(page) - 1) * limit))
      .sort(sortBy)
      .select(
        `_id
        product_name
        product_image
        product_weight
        product_price
        product_currency
        order_quantity
        product_category
        product_country`
      );

    const count = await Product
      .find(query)
      .countDocuments();

    return res.send({products_list, count});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  };
};

async function productDetailsController(req, res) {
  try {
    let query = {};

    const { product_id }  = req.params;

    //For product details
    if(product_id !== undefined) {
      query = { _id: product_id };
    }

    const products_details = await Product
      .findOne(query)
      .select(
        `_id
        product_name
        product_image
        product_weight
        product_price
        product_currency
        product_country
        product_details
        order_quantity
        delivery_image
        delivery_text
        cash_image
        cash_text
        payment_text
        american_express_image
        master_card_image
        visa_card_image
        bcash_image`
      );

    return res.send(products_details);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  };
};

module.exports = {
  productCreateController, productListController, productDetailsController
};
