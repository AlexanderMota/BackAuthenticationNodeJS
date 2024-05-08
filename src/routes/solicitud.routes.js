const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware,CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ SolicitudController }) {
  const router = Router();
  
  router.get("/", [AuthMiddleware, ParseIntMiddleware], SolicitudController.mongoGetAll);
  router.get("/byid/:id", [AuthMiddleware,ParseIntMiddleware], SolicitudController.mongoGetSolicitud);

  router.post("/", [AuthMiddleware, ParseIntMiddleware], SolicitudController.mongoCreate);
  
  router.delete("/byid/:id", [AuthMiddleware, ParseIntMiddleware], SolicitudController.mongoDeteleSolicitud);
  
  return router;
};
