const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = ({ UbicacionController }) => {
  const router = Router();

  router.get("/byid/:id", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoGet);
  router.get("/", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoGetAll);
  router.get("/tarea/:idTarea", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoGetUbicacionByIdTarea);
  /*router.get("/local", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mysqlGetAll);
  router.get("/tarea/:idTarea", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoGetEmpleadosByIdTarea);
  
  router.patch("/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoUpdate);
  */
  router.post("/", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoCreate);
  router.post("/tarea/:idTarea", [AuthMiddleware, ParseIntMiddleware], UbicacionController.mongoCreateByIdTarea);
  
  //router.delete("/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoDelete);

  return router;
};
