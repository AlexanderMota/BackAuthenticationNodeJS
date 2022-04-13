const { Router } = require("express");
const controllers = require("../controllers");

module.exports = function({ HomeController }) {
  const router = Router();

  router.get("/", HomeController.index);
  //router.get("/empleados", controllers.getAllEmpleados);

  return router;
};
