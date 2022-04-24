const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");

module.exports = function({ AuthController }) {
  const router = Router();

  
  router.post("/", AuthController.compruebaToken);
  router.post("/signup", [AuthMiddleware, ParseIntMiddleware], AuthController.signUp);
  router.post("/signin", ParseIntMiddleware, AuthController.signIn);

  return router;
};
