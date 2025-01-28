const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports.generateToken = function(empleado) {
  return sign({ empleado }, JWT_SECRET, { expiresIn: "1h" });
};
