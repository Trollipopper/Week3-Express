import express from 'express';
import * as ctrl from '../controllers/catsController.js';
import {upload, createThumbnail} from '../../middlewares/upload.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {catCreateRules, catUpdateRules} from '../../middlewares/validators.js';
import {validationResult} from 'express-validator';

const router = express.Router();

router.get('/', ctrl.getCats);
router.get('/user/:userId', ctrl.getCatsByUserId);
router.get('/:id', ctrl.getCat);
router.post(
  '/',
  authenticateToken,
  upload.single('file'),
  createThumbnail,
  catCreateRules,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return next({
        status: 400,
        message: 'Validation failed',
        details: result.array(),
      });
    return ctrl.createCat(req, res, next);
  }
);
router.put('/:id', authenticateToken, catUpdateRules, (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return next({
      status: 400,
      message: 'Validation failed',
      details: result.array(),
    });
  return ctrl.updateCat(req, res, next);
});

router.delete('/:id', authenticateToken, (req, res, next) => {
  return ctrl.deleteCat(req, res, next);
});

export default router;
