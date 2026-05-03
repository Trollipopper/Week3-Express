import express from 'express';
import * as ctrl from '../controllers/catsController.js';
import { upload, createThumbnail } from '../../middlewares/upload.js';

const router = express.Router();

router.get('/', ctrl.getCats);
router.get('/user/:userId', ctrl.getCatsByUserId);
router.get('/:id', ctrl.getCat);
router.post('/', upload.single('file'), createThumbnail, ctrl.createCat);
router.put('/:id', ctrl.updateCat);
router.delete('/:id', ctrl.deleteCat);

export default router;
