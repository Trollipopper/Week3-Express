import express from 'express';
import * as ctrl from '../controllers/catsController.js';
import { upload, createThumbnail } from '../../middlewares/upload.js';
import { authenticateToken } from '../../middlewares/authentication.js';

const router = express.Router();

router.get('/', ctrl.getCats);
router.get('/user/:userId', ctrl.getCatsByUserId);
router.get('/:id', ctrl.getCat);
router.post('/', upload.single('file'), createThumbnail, ctrl.createCat);
router.put('/:id', authenticateToken, ctrl.updateCat);
router.delete('/:id', authenticateToken, ctrl.deleteCat);

export default router;
