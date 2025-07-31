import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addTravelStory } from '../controllers/travelStory.controller.js';
import { getAllTravelStory } from '../controllers/travelStory.controller.js';
import { imageUpload } from '../controllers/travelStory.controller.js';
import upload from '../multer.js';

const router = express.Router();

router.post('/image-upload',upload.single("image"), imageUpload);

router.post('/add', verifyToken, addTravelStory);

router.get('/get-all', verifyToken, getAllTravelStory);

export default router;