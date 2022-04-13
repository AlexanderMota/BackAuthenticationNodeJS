const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");
//const swaggerUI = require("swagger-ui-express");
//const { SWAGGER_PATH } = require("../config");
//const swaggerDocument = require(SWAGGER_PATH);

module.exports = function({
  HomeRoutes
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression());

  apiRoutes.use("/home", HomeRoutes);

  router.use("/v1/api", apiRoutes);
  //router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};



// const { Router } = require('express');

// const router = Router();

// router.get('/', (req, res) => res.send('Welcome'))

// module.exports = router;
