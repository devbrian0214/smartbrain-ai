import express from 'express';

// import controller
import { signin, register } from '../Controllers/user.js';

// create router
const router = express.Router();

router.post('/signin', signin);
router.post('/register', register);

export default router;
