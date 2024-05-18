import express from 'express';

import { PostController } from './post.controller';
import { postZodSchema } from './post.validation';

const router = express.Router();

router.get('/get-posts', PostController.getPosts);

export const PostRoutes = router;
