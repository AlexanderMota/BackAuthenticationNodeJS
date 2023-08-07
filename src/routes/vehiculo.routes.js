const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");

module.exports = function({ VehiculoController }) {
  const router = Router();
  
  router.get("/", AuthMiddleware,VehiculoController.mongoGetAll);
  router.get("/{idPropietario}", [AuthMiddleware, ParseIntMiddleware], VehiculoController.mongoGetVehiculoByIdPropietario);
  
  router.post("/", [AuthMiddleware,ParseIntMiddleware], VehiculoController.mongoCreate);
  return router;
};
