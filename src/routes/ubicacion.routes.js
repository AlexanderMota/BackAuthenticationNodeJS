const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = ({ UbicacionController }) => {
  const router = Router();

  router.get("/byid/:id", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoGet);
  router.get("/", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoGetAll);
  router.get("/tarea/:idTarea", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoGetUbicacionByIdTarea);
  router.get("/paradas/:idUbi", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoGetParada);
  
  router.patch("/byid/:id", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoUpdate);
  router.patch("/paradas/:idParada", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoAgregaParada);
  
  router.post("/", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoCreate);
  router.post("/paradas/:destino", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoCreateParada);

  router.patch("/paradas/delete/:idParada", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoDeleteParada);
  router.delete("/paradas/:idParada", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoDeleteUbiParada);
  return router;
};
