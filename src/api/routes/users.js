import express from 'express';
import * as ctrl from '../controllers/usersController.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {
  userCreateRules,
  userUpdateRules,
} from '../../middlewares/validators.js';
import {validationResult} from 'express-validator';

const router = express.Router();

router.get('/', (req, res, next) => {
  return ctrl.getUsers(req, res, next);
});
router.get('/:id', (req, res, next) => {
  return ctrl.getUser(req, res, next);
});

router.post('/', userCreateRules, (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return next({
      status: 400,
      message: 'Validation failed',
      details: result.array(),
    });
  return ctrl.createUser(req, res, next);
});

router.put('/:id', authenticateToken, userUpdateRules, (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return next({
      status: 400,
      message: 'Validation failed',
      details: result.array(),
    });
  return ctrl.updateUser(req, res, next);
});

router.delete('/:id', authenticateToken, (req, res, next) => {
  return ctrl.deleteUser(req, res, next);
});

export default router;
