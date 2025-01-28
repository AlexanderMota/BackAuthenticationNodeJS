const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = ({ EmpleadoController }) => {
  const router = Router();

  router.get("/", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoGetAll);
  router.get("/local", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mysqlGetAll);
  router.get("/roles", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.getRoles);
  router.get("/departamentos", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.getDepartamentos);
  //router.get("/centro/:idCentro", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.getEmpleadosByCentro);
  router.get("/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoGetEmpleadoByIdEmpleado);
  router.get("/tarea/:idTarea", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoGetEmpleadosByIdTarea);
  router.get("/disponibles/:idSuper", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoGetEmpleadosDisponibles);
  
  router.patch("/byid/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoUpdate);
  
  router.delete("/byid/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.mongoDelete);

  return router;
};
