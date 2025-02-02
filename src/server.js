import express from "express";
import fs from "fs";
import https from "https";
import http from "http";

const app = express();

// Cargar los certificados SSL
const httpsOptions = {
  key: fs.readFileSync("./src/config/ssl/server.key"),
  cert: fs.readFileSync("./src/config/ssl/server.cert"),
};

// Puerto HTTP
const HTTP_PORT = 4430;
const HTTPS_PORT = process.env.PORT;

export default class Server {
  constructor({ routes }) {
    app.use(express.json())
      .use(routes);
  }

  start() {
    return new Promise((resolve) => {
      // Servidor HTTP
      http.createServer(app).listen(HTTP_PORT, () => {
        console.log(`🌍 Servidor HTTP corriendo en http://localhost:${HTTP_PORT}`);
      });

      // Servidor HTTPS
      https.createServer(httpsOptions, app).listen( () => {
        console.log(`🔒 Servidor HTTPS corriendo en https://localhost:${process.env.PORT}`);
        resolve();
      });
    });
  }
}
