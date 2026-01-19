import express from 'express';
import { getAboutItems, getDevelopers } from '../controllers/aboutController.js';

const router = express.Router();

router.get('/items', getAboutItems);
router.get('/devs', getDevelopers);

export default router;
