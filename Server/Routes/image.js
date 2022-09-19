import express from 'express';

// import controller
import { handleImageURL } from '../Controllers/imageURL.js';

// create router
const router = express.Router();

router.post('/', handleImageURL);

export default router;
