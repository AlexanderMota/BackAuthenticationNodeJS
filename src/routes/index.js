const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");
const swaggerUI = require("swagger-ui-express");
const { SWAGGER_PATH } = require("../config");
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function({
  HomeRoutes,
  EmpleadoRoutes,
  TareaRoutes,
  AuthRoutes
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression());

  apiRoutes.use("/home", HomeRoutes);
  apiRoutes.use("/empleados", EmpleadoRoutes);
  apiRoutes.use("/tareas", TareaRoutes);
  apiRoutes.use("/auth", AuthRoutes);

  router.use("/api", apiRoutes);
  router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};



// const { Router } = require('express');

// const router = Router();

// router.get('/', (req, res) => res.send('Welcome'))

// module.exports = router;
