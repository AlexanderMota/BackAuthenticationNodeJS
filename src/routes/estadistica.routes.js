const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ EstadisticasController }) {
  const router = Router();
  
  router.get("/comentarios", [AuthMiddleware, ParseIntMiddleware], EstadisticasController.mongoGetComentariosEst);
  
  return router;
};
