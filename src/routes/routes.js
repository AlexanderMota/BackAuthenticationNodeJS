import { Router } from 'express';

export default ({ AuthRoutes }) => {
  const router = Router();

  router.use('/auth', AuthRoutes);

  return router;
}