import express from 'express';

import { AuthenticationController } from './auth.controller';

const router = express.Router();

router.get('/get-users', AuthenticationController.getUsers);
router.post('/add-user', AuthenticationController.addUsers);

export const AuthenticationRoute = router;
