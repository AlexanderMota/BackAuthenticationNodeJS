const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ TareaController }) {
  const router = Router();

  router.get("/", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetAll);
  router.get("/local", AuthMiddleware, TareaController.mysqlGetAll);
  router.get("/:idTarea", ParseIntMiddleware, TareaController.mongoGet);
  router.get("/:idEmpleado", ParseIntMiddleware, TareaController.mongoGetTareasByIdEmpleado);
  router.post("/", ParseIntMiddleware, TareaController.mongoCreate);
  router.post("/addempleado", ParseIntMiddleware, TareaController.mongoAddEmpleado);
  router.patch("/:idTarea", ParseIntMiddleware, TareaController.mongoUpdate);
  router.delete("/:idTarea", ParseIntMiddleware, TareaController.mongoDelete);

  return router;
};
