import { Router } from 'express';

export default ({ AuthController }) => {
  const router = Router();

  router.post('/login', (req, res) => AuthController.login(req, res));
  router.post('/register', (req, res) => AuthController.register(req, res));

  return router;
};