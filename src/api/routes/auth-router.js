import express from 'express';
import {postLogin, getMe} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {loginRules} from '../../middlewares/validators.js';
import {validationResult} from 'express-validator';

const router = express.Router();

router.post('/login', loginRules, (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return next({
      status: 400,
      message: 'Validation failed',
      details: result.array(),
    });
  return postLogin(req, res, next);
});

router.get('/me', authenticateToken, getMe);

export default router;
