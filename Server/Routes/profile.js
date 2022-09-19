import express from 'express';

// import controller
import { getProfile, updateProfileEntries } from '../Controllers/profile.js';

// create router
const router = express.Router();

router.get('/:id', getProfile);
router.patch('/entries', updateProfileEntries);

export default router;
