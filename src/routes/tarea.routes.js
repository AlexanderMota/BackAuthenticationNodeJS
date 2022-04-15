const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ TareaController }) {
  const router = Router();

  router.get("/", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetAll);
  router.get("/:idTarea", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetTareaByIdTarea);
  router.get("/local", [AuthMiddleware, ParseIntMiddleware], TareaController.mysqlGetAll);
  router.get("/empleado/:idEmpleado", [AuthMiddleware,ParseIntMiddleware], TareaController.mongoGetTareasByIdEmpleado);

  router.post("/", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoCreate);
  router.post("/addempleado", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoAddEmpleado);

  router.patch("/:idTarea", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoUpdate);

  router.delete("/:idTarea", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoDelete);

  return router;
};
