import express from 'express';

import validateRequest from '../../middlewares/ValidateRequest';
import { PostController } from './post.controller';
import { postZodSchema } from './post.validation';

const router = express.Router();



router.post(
  '/create-post',
  validateRequest(postZodSchema.usePostZodSchema),
  PostController.createPost
);


router.get('/get-posts', PostController.getPosts);

export const PostRoutes = router;
