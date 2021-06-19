const Users = require("../Model/Users");
const Order = require("../Model/Order");

async function orderCreateController(req, res) {
  try {
    const user = await Users
      .findOne({
        user_email: req.user_email
      })
      .select(
        `user_name
        user_email
        user_phone_number
        address
        post_office
        police_station
        city
        zip
        country`
      );

    const dateString = new Date().toLocaleDateString();

    const timeString = new Date().toLocaleTimeString();

    const order_list = req.body;

    const orderSave = new Order({
      user_name: user.user_name,
      user_email: user.user_email,
      user_phone_number: user.user_phone_number,
      address: user.address,
      post_office: user.post_office,
      police_station: user.police_station,
      city: user.city,
      zip: user.zip,
      country: user.country,
      date: dateString,
      time: timeString,
      user_order: order_list
    });

    const orderCreateAndSave = await orderSave.save();

    res.json({ order: orderCreateAndSave });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  };
};

async function orderListController(req, res) {
  try {

    const order_list = await Order
      .find({
        user_email: req.user_email
      })
      .select(
        `user_name
        user_email
        user_phone_number
        address
        post_office
        police_station
        city
        zip
        country
        date
        time
        user_order`
      );

    res.send(order_list);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  };
};

module.exports = {
  orderCreateController, orderListController
};
