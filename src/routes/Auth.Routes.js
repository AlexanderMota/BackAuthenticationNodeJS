import { Router } from 'express';

export default ({ AuthController, MiddleCookieParser }) => {
  const router = Router();

  // Middleware para manejar CORS
  /*router.use((req, res, next) => {
    
    // Si la solicitud es de tipo OPTIONS (preflight), respondemos con un 200
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    next();
  });*/

  // Rutas de login y registro
  router.post('/login', (req, res) => AuthController.login(req, res));
  router.post('/register', (req, res) => AuthController.register(req, res));

  return router;
};
