const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = function(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    const error = new Error();
    error.message = "Token must be sent";
    error.status = 419;
    throw error;
  }

  jwt.verify(token, JWT_SECRET, function(err, decodedToken) {
    //console.log(decodedToken.empleado);
    if (err) {
      const error = new Error();
      error.message = "Invalid token";
      error.status = 420;
      throw error;
    }

    req.empleado = decodedToken.empleado;
    next();
  });
};
