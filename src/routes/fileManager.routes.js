const { Router } = require("express");
const { FilesMiddleware, AuthMiddleware, ParseIntMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = ({ FileManagerController }) => {
  const router = Router();

  router.post("/fileUp",[AuthMiddleware, ParseIntMiddleware, FilesMiddleware], FileManagerController.postProfilePic);

  return router;
};