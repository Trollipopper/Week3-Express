import * as model from '../models/usersModel.js';
import bcrypt from 'bcrypt';

export async function getUsers(req, res, next) {
  try {
    const users = await model.listAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await model.findUserById(req.params.id);
    if (!user) return next({status: 404, message: 'User not found'});
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    // set default role if not provided
    if (!req.body.role) {
      req.body.role = 'user';
    }
    const newUser = await model.addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const existingUser = await model.findUserById(req.params.id);
    if (!existingUser) return next({status: 404, message: 'User not found'});
    const auth = res.locals.user;
    if (!auth) return next({status: 401, message: 'Unauthorized'});
    if (auth.role !== 'admin' && Number(auth.user_id) !== Number(req.params.id))
      return next({status: 403, message: 'Forbidden'});
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await model.modifyUser(
      {...existingUser, ...req.body},
      req.params.id
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const auth = res.locals.user;
    if (!auth) return next({status: 401, message: 'Unauthorized'});
    if (auth.role !== 'admin' && Number(auth.user_id) !== Number(req.params.id))
      return next({status: 403, message: 'Forbidden'});

    const deletedUser = await model.removeUser(req.params.id);
    if (!deletedUser) return next({status: 404, message: 'User not found'});

    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
}
