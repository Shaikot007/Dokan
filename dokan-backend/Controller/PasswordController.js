const Users = require("../Model/Users");
const Token = require("../Model/Token");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const console = require("console");

async function forgetPasswordController(req, res) {
  try {
    const user = await Users
      .findOne({
        user_email: req.body.user_email
      })
      .select(
        `_id
        user_name
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
      const token = await Token.findOne({ userId: user._id });

      if (token) {
        await token.deleteOne();
      };

      //Generate token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = bcrypt.hashSync(resetToken, Number(process.env.SALTED));

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: user.user_email,
        subject: "Password reset link",
        html: `<p>Click <a href="${process.env.RESET_PASSWORD_PORT}/resetpassword/${resetToken}/${user._id}">here</a> to reset your password</p>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      const tokenSave = new Token({
        userId: user._id,
        token: hashedToken
      });

      const tokenCreateAndSave = await tokenSave.save();

      res.json({
        reset_token: tokenCreateAndSave,
        message: "The password reset link sent to your email."
      });
    }
    else {
      res.status(401).json({ message: "User account does not exist." });
    };
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Authentication failed." });
  };
};

async function resetPasswordController(req, res) {
  try {
    const token = req.params.token;
    const userId = req.params.id;

    const passwordResetToken = await Token
      .findOne({
        userId: userId
      });

    if (!passwordResetToken) {
      return res.status(401).json({ message: "Invalid or expired password reset token." });
    };

    const isValid = bcrypt.compareSync(token, passwordResetToken.token);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid or expired password reset token." });
    };

    const hashedPassword = bcrypt.hashSync(req.body.user_password, Number(process.env.SALTED));

    await Users.updateOne(
      { _id: passwordResetToken.userId },
      { $set: { user_password: hashedPassword } },
      { new: true }
    );

    const user = await Users.findById({ _id: passwordResetToken.userId });

    await passwordResetToken.deleteOne();

    res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Authentication failed." });
  }
};

module.exports = {
  forgetPasswordController, resetPasswordController
};
