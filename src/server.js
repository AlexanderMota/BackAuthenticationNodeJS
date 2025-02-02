import express from "express";

const app = express();

export default class Server {
  constructor({ routes }) {
    app.use(express.json())
      .use(routes);
  }

  start() {
    return new Promise( resolve => {
      app.listen( process.env.PORT, () => {
        console.log( "🌍 HTTP Server API running on port " + process.env.PORT );
        resolve();
      });
    });
  }
}
