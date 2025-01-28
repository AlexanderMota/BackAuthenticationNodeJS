const { verify } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports.verifyToken = function(token) {
  return verify(token, JWT_SECRET);
};