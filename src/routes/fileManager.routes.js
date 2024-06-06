const { Router } = require("express");
const { FilesMiddleware, AuthMiddleware, ParseIntMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = ({ FileManagerController }) => {
  const router = Router();

  router.get("/fileDown/:userId",[AuthMiddleware, ParseIntMiddleware, FilesMiddleware], FileManagerController.getProfilePic);

  router.post("/fileUp/:userId",[AuthMiddleware, ParseIntMiddleware, FilesMiddleware], FileManagerController.postProfilePic);

  return router;
};