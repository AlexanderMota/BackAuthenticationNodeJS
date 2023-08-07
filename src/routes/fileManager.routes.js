const { Router } = require("express");
const { FilesMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = ({ FileManagerController }) => {
  const router = Router();

  router.post("/fileUp",FilesMiddleware, FileManagerController.postProfilePic);

  return router;
};