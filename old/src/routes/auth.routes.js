const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");

module.exports = function({ AuthController }) {
  const router = Router();

  router.get("/myuser/:mail", [AuthMiddleware, ParseIntMiddleware], AuthController.getMiPerfil);
  
  router.post("/", AuthController.compruebaToken);
  router.post("/signup", [AuthMiddleware, ParseIntMiddleware], AuthController.signUp);
  router.post("/signin", ParseIntMiddleware, AuthController.signIn);

  router.patch("/", [AuthMiddleware, ParseIntMiddleware], AuthController.updatePerfil);
  return router;
};
