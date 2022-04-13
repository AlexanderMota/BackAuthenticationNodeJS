const { Router } = require("express");

module.exports = function({ EmpleadoController }) {
  const router = Router();

  router.get("/", EmpleadoController.getAllSQL);
  router.get("/:idEmpleado", EmpleadoController.get);
  router.patch("/:idEmpleado", EmpleadoController.update);
  router.delete("/:idEmpleado", EmpleadoController.delete);

  return router;
};
