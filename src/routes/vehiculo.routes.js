const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");

module.exports = function({ VehiculoController }) {
  const router = Router();
  
  router.get("/", [AuthMiddleware, ParseIntMiddleware],VehiculoController.mongoGetAll);
  router.get("/propietario/:idPropietario", [AuthMiddleware, ParseIntMiddleware], VehiculoController.mongoGetVehiculoByIdPropietario);
  router.get("/matricula/:matricula", [AuthMiddleware, ParseIntMiddleware], VehiculoController.mongoGetVehiculoByMatricula);
  router.get("/parada/:idParada", [AuthMiddleware, ParseIntMiddleware], VehiculoController.mongoGetVehiculoByIdParada);
  
  router.post("/", [AuthMiddleware,ParseIntMiddleware], VehiculoController.mongoCreate);
  
  router.patch("/", [AuthMiddleware,ParseIntMiddleware], VehiculoController.mongoUpdate);
  return router;
};
