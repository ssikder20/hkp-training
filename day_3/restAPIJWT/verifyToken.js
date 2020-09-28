const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get JWT token and return 401 if there is none
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  // Validate token using token secret
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
