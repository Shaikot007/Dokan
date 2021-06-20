const Users = require("../Model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function usersCreateController(req, res) {
  try {
    const user = await Users
      .findOne({
        user_email: req.body.user_email
      })
      .select("user_email");

    if (!user) {
      const userName = req.body.user_name;
      const userEmail = req.body.user_email;
      const hashedPassword = bcrypt.hashSync(req.body.user_password, Number(process.env.SALTED));
      const userPhoneNumber = req.body.user_phone_number;
      const userAddress = req.body.address;
      const userPostOffice = req.body.post_office;
      const userPoliceStation = req.body.police_station;
      const userCity = req.body.city;
      const userZip = req.body.zip;
      const userCountry = req.body.country;

      const userSave = new Users({
        user_name: userName,
        user_email: userEmail,
        user_password: hashedPassword,
        user_phone_number: userPhoneNumber,
        address: userAddress,
        post_office: userPostOffice,
        police_station: userPoliceStation,
        city: userCity,
        zip: userZip,
        country: userCountry
      });

      const userCreateAndSave = await userSave.save();

      res.json({ users: userCreateAndSave });
    }
    else {
      return res.status(400).json({ message: "This account already exists." });
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Sign up failed." });
  };
};

async function userController(req, res) {
  try {
    const user = await Users
      .findOne({
        user_email: req.body.user_email
      })
      .select(
        `user_name
        user_email
        user_password
        user_phone_number
        address
        post_office
        police_station
        city
        zip
        country`
      );

    if (user) {
      const isValidPassword = bcrypt.compareSync(req.body.user_password, user.user_password);

      if (isValidPassword) {
        //Generate token
        const token = jwt.sign({
          user_email: user.user_email
        }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

        res.status(200).json({
          user_name: user.user_name,
          access_token: token,
          message: "Sign in successful."
        });
      }
      else {
        res.status(401).json({ message: "Authentication failed." });
      }
    }
    else {
      res.status(401).json({ message: "Authentication failed." });
    };
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Authentication failed." });
  };
};

module.exports = {
  usersCreateController, userController
};
