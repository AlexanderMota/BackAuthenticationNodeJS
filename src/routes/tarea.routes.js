const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ TareaController }) {
  const router = Router();

  router.get("/", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetOrderBy);
  router.get("/:id", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGet);
  router.get("/local", [AuthMiddleware, ParseIntMiddleware], TareaController.mysqlGetAll);
  router.get("/empleado/:idEmpleado", [AuthMiddleware,ParseIntMiddleware], TareaController.mongoGetTareasByIdEmpleado);
  router.get("/solicitudes/todas", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetAllSolicitudes);
  router.get("/solicitud/:id", [AuthMiddleware,ParseIntMiddleware], TareaController.mongoGetSolicitud);

  router.post("/", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoCreate);
  router.post("/solicitar", [AuthMiddleware, ParseIntMiddleware], TareaController.solicitarTarea);
  router.post("/addempleado", [AuthMiddleware, ParseIntMiddleware], TareaController.addEmpleado);

  router.patch("/:id", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoUpdate);

  router.delete("/:id", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoDelete);
  router.delete("/solicitud/:id", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoDeteleSolicitud);
  
  return router;
};
