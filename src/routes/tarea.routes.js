const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ TareaController }) {
  const router = Router();

  router.get("/", [AuthMiddleware, ParseIntMiddleware], TareaController.getAll);
  router.get("/local", AuthMiddleware, TareaController.getAllSQL);
  router.get("/:idTarea", ParseIntMiddleware, TareaController.get);
  router.patch("/:idTarea", ParseIntMiddleware, TareaController.update);
  router.delete("/:idTarea", ParseIntMiddleware, TareaController.delete);

  return router;
};
