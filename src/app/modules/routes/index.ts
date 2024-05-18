import express from 'express';
import { PostRoutes } from '../post/post.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/post',
    route: PostRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;