import express from 'express';

// import controller
import { signin, register, getUser } from '../Controllers/user.js';

// create router
const router = express.Router();

router.get('/:id', getUser);
router.post('/signin', signin);
router.post('/register', register);

export default router;
