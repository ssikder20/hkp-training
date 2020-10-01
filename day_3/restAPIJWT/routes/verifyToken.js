const jwt = require("jsonwebtoken");

module.exports = {
  // Check if token exists and validate it (passed in through request body)
  verifyBody: function (req, res, next) {
    // Get JWT token and return 401 if there is none
    const token = req.body.token;
    if (!token) return res.status(401).send({ message: "Access Denied" });

    // Validate token using token secret
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send({ message: "Invalid Token" });
    }
  },

  // Check if token exists and validate it (passed in through request paramters)
  verifyParam: function (req, res, next) {
    // Get JWT token and return 401 if it doesn't exist
    const token = req.params.token;
    if (!token) return res.status(401).send({ message: "Access Denied" });

    // Validate token using token secret
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send({ message: "Invalid Token" });
    }
  },
};
