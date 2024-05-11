const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ TareaController }) {
  const router = Router();

  router.get("/", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetOrderBy);
  router.get("/byid/:id", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGet);
  router.get("/comentarios/:idTarea", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetComentariosByIdTarea);
  router.get("/supertareas", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetSupertareas);
  router.get("/subtareas/:idTarea", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetSubtareasByIdTarea);
  //router.get("/local", [AuthMiddleware, ParseIntMiddleware], TareaController.mysqlGetAll);
  router.get("/empleado/:idEmpleado", [AuthMiddleware,ParseIntMiddleware], TareaController.mongoGetTareasByIdEmpleado);
  //router.get("/solicitudes", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoGetAllSolicitudes);
  //router.get("/solicitud/:id", [AuthMiddleware,ParseIntMiddleware], TareaController.mongoGetSolicitud);

  router.post("/", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoCreate);
  //router.post("/solicitar", [AuthMiddleware, ParseIntMiddleware], TareaController.solicitarTarea);
  router.post("/addempleado", [AuthMiddleware, ParseIntMiddleware], TareaController.addEmpleado);
  router.post("/addsupertarea", [AuthMiddleware, ParseIntMiddleware], TareaController.addSupertarea);
  router.post("/addsubtarea", [AuthMiddleware, ParseIntMiddleware], TareaController.addSubtarea);
  router.post("/addcomentario", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoAddComentario);

  router.patch("/:id", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoUpdate);

  router.delete("/:id", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoDelete);
  router.delete("/empleado/:id", [AuthMiddleware, ParseIntMiddleware], TareaController.mongoQuitaEmpleadoTarea);
  
  return router;
};
