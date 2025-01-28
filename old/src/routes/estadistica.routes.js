const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ EstadisticasController }) {
  const router = Router();
  
  router.get("/comentarios", [AuthMiddleware, ParseIntMiddleware], EstadisticasController.mongoGetComentariosEst);
  router.get("/empleados", [AuthMiddleware, ParseIntMiddleware], EstadisticasController.mongoGetEmpleadosEst);
  //router.get("/solicitudes", [AuthMiddleware, ParseIntMiddleware], EstadisticasController.mongoGetSolicitudesEst);
  router.get("/tareas", [AuthMiddleware, ParseIntMiddleware], EstadisticasController.mongoGetTareasEst);
  
  return router;
};
