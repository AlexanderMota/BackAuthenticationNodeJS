const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");

module.exports = function({ AuthController }) {
  const router = Router();

  router.post("/signup", [AuthMiddleware, ParseIntMiddleware],AuthController.signUp);
  router.post("/signin", AuthController.signIn);

  return router;
};
