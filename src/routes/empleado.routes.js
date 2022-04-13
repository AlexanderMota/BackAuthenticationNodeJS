const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ EmpleadoController }) {
  const router = Router();

  router.get("/", [/*AuthMiddleware,*/ ParseIntMiddleware], EmpleadoController.getAll);
  router.get("/local", AuthMiddleware, EmpleadoController.getAllSQL);
  router.get("/:idEmpleado", ParseIntMiddleware, EmpleadoController.get);
  router.patch("/:idEmpleado", ParseIntMiddleware, EmpleadoController.update);
  router.delete("/:idEmpleado", ParseIntMiddleware, EmpleadoController.delete);

  return router;
};
