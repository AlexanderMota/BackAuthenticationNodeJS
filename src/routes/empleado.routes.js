const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ EmpleadoController }) {
  const router = Router();

  router.get("/", [AuthMiddleware, ParseIntMiddleware, CacheMiddleware(CACHE_TIME.MID_HOUR)], EmpleadoController.getAll);
  router.get("/local", [AuthMiddleware, ParseIntMiddleware], EmpleadoController.getAllSQL);
  router.get("/:idEmpleado", EmpleadoController.get);
  router.patch("/:idEmpleado", EmpleadoController.update);
  router.delete("/:idEmpleado", EmpleadoController.delete);

  return router;
};
