const { NotExtended } = require("http-errors");
const express = require("express");
const jwt = require("jsonwebtoken");

// Check if token exists and validate it
module.exports = function (req, res, next) {
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
};
