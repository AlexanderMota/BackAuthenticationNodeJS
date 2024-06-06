const container = require("./src/server/container");
const server = container.resolve("app");
const { MONGO_URI_DEV } = container.resolve("config");

const mongoose = require("mongoose");

mongoose
  .connect(MONGO_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => server.start())
  .catch(console.log);




