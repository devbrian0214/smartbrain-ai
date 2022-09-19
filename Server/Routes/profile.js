import express from 'express';

// import controller & middleware
import { getProfile, updateProfileEntries } from '../Controllers/profile.js';
import { auth } from '../Middlewares/Auth.js';

// create router
const router = express.Router();

router.get('/:id', auth, getProfile);
router.patch('/entries', auth, updateProfileEntries);

export default router;
