const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ EmpleadoController }) {
  const router = Router();

  router.get("/", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.getAll);
  router.get("/local", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.getAllSQL);
  router.get("/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.get);
  router.patch("/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.update);
  router.delete("/:idEmpleado", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.delete);

  return router;
};
