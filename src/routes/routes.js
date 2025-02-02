import { Router } from 'express';
import swaggerUi from "swagger-ui-express";

import fs from "fs";
import path from "path";
const swaggerPath = path.resolve("src/config/swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

export default ({ AuthRoutes }) => {
  const router = Router();

  router.use('/auth', AuthRoutes);

  router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return router;
}