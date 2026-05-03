import express from 'express';
import * as ctrl from '../controllers/catsController.js';
import { upload, createThumbnail } from '../../middlewares/upload.js';

const router = express.Router();

router.get('/', ctrl.getCats);
router.get('/:id', ctrl.getCat);
router.post('/', upload.single('file'), createThumbnail, ctrl.createCat);
router.put('/:id', (req, res) => {
  res.json({message: 'Cat item updated.'});
});
router.delete('/:id', (req, res) => {
  res.json({message: 'Cat item deleted.'});
});

export default router;
