const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");

module.exports = function({ EmpleadoController }) {
  const router = Router();

  router.get("/", AuthMiddleware, EmpleadoController.getAll);
  router.get("/:idEmpleado", EmpleadoController.get);
  router.patch("/:idEmpleado", EmpleadoController.update);
  router.delete("/:idEmpleado", EmpleadoController.delete);

  return router;
};
