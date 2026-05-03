import express from 'express';
import * as ctrl from '../controllers/usersController.js';
import { authenticateToken } from '../../middlewares/authentication.js';

const router = express.Router();

router.get('/', ctrl.getUsers);
router.get('/:id', ctrl.getUser);
router.post('/', ctrl.createUser);
router.put('/:id', authenticateToken, ctrl.updateUser);
router.delete('/:id', authenticateToken, ctrl.deleteUser);

export default router;
