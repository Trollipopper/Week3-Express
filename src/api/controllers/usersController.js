import * as model from '../models/usersModel.js';

export async function getUsers(req, res) {
  try {
    const users = model.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({message: 'Failed to load users'});
  }
}

export async function getUser(req, res) {
  try {
    const user = model.getUserById(req.params.id);
    if (!user) return res.status(404).json({message: 'User not found'});
    res.json(user);
  } catch (err) {
    res.status(500).json({message: 'Failed to load user'});
  }
}

export async function createUser(req, res) {
  try {
    const newUser = model.addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({message: 'Failed to add user'});
  }
}
