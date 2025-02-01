import express from "express";

let app = null;

export default class Server {
  constructor({ routes }) {
    app = express()
      .use(express.json())
      .use(routes);
  }

  start() {
    return new Promise(resolve => {
        app.listen(process.env.PORT, () => {
        console.log(
          "API running on port " + process.env.PORT
        );

        resolve();
      });
    });
  }
}
