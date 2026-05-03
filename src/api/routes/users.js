import express from 'express';
import * as ctrl from '../controllers/usersController.js';

const router = express.Router();

router.get('/', ctrl.getUsers);
router.get('/:id', ctrl.getUser);
router.post('/', ctrl.createUser);
router.put('/:id', (req, res) => {
  res.json({message: 'User item updated.'});
});
router.delete('/:id', (req, res) => {
  res.json({message: 'User item deleted.'});
});

export default router;
