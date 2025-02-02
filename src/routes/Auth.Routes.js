import { Router } from 'express';

export default ({ AuthController }) => {
  const router = Router();

  router.post('/login', (req, res) => AuthController.login(req, res));

  return router;
};