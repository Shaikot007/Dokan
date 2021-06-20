const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const { user_email } = decoded;
    req.user_email = user_email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  };
};

module.exports = checkToken;
