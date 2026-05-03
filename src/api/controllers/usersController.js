import * as model from '../models/usersModel.js';

export async function getUsers(req, res) {
  try {
    const users = await model.listAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({message: 'Failed to load users'});
  }
}

export async function getUser(req, res) {
  try {
    const user = await model.findUserById(req.params.id);
    if (!user) return res.status(404).json({message: 'User not found'});
    res.json(user);
  } catch (err) {
    res.status(500).json({message: 'Failed to load user'});
  }
}

export async function createUser(req, res) {
  try {
    const newUser = await model.addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({message: 'Failed to add user'});
  }
}

export async function updateUser(req, res) {
  try {
    const existingUser = await model.findUserById(req.params.id);
    if (!existingUser) return res.status(404).json({message: 'User not found'});

    const updatedUser = await model.modifyUser({...existingUser, ...req.body}, req.params.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({message: 'Failed to update user'});
  }
}

export async function deleteUser(req, res) {
  try {
    const deletedUser = await model.removeUser(req.params.id);
    if (!deletedUser) return res.status(404).json({message: 'User not found'});

    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({message: 'Failed to delete user'});
  }
}
