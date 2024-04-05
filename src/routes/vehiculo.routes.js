const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");

module.exports = function({ VehiculoController }) {
  const router = Router();
  
  router.get("/", [AuthMiddleware, ParseIntMiddleware],VehiculoController.mongoGetAll);
  router.get("/propietario/:idPropietario", [AuthMiddleware, ParseIntMiddleware], VehiculoController.mongoGetVehiculoByIdPropietario);
  router.get("/matricula/:matricula", [AuthMiddleware, ParseIntMiddleware], VehiculoController.mongoGetVehiculoByMatricula);
  
  router.post("/", [AuthMiddleware,ParseIntMiddleware], VehiculoController.mongoCreate);
  return router;
};
