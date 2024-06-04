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
  EmpleadoRoutes,
  TareaRoutes,
  AuthRoutes,
  FileManagerRoutes,
  UbicacionRoutes,
  SolicitudRoutes,
  VehiculoRoutes,
  EstadisticasRoutes
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression());

  apiRoutes.use("/empleados", EmpleadoRoutes);
  apiRoutes.use("/tareas", TareaRoutes);
  apiRoutes.use("/auth", AuthRoutes);;
  apiRoutes.use("/files", FileManagerRoutes);
  apiRoutes.use("/ubicacion", UbicacionRoutes);
  apiRoutes.use("/solicitud", SolicitudRoutes);
  apiRoutes.use("/vehiculo", VehiculoRoutes);
  apiRoutes.use("/estadisticas", EstadisticasRoutes);

  router.use("/api", apiRoutes);
  router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};