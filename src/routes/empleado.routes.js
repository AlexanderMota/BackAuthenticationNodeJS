const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ EmpleadoController }) {
  const router = Router();

  router.get("/", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoGetAll);
  router.get("/local", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mysqlGetAll);
  router.get("/:id", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoGet);
  router.get("/tarea/:idTarea", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoGetEmpleadosByIdTarea);
  
  router.patch("/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoUpdate);
  
  router.post("/addtarea", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoAddTarea);
  
  router.delete("/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoDelete);

  return router;
};
