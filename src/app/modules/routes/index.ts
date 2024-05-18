import express from 'express';
import { AuthenticationRoute } from '../authentication/auth.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/authentication',
    route: AuthenticationRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;