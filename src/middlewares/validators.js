import { body } from 'express-validator';

const userCreateRules = [
  body('name').trim().isLength({min:1}).withMessage('Name is required'),
  body('username').trim().isLength({min:3}).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
];

const userUpdateRules = [
  body('name').optional().trim().isLength({min:1}).withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email required'),
  body('password').optional().isLength({min:6}).withMessage('Password must be at least 6 characters'),
];

const catCreateRules = [
  body('cat_name').trim().isLength({min:1}).withMessage('Cat name is required'),
  body('weight').optional().isFloat({gt:0}).withMessage('Weight must be a positive number'),
  body('owner').isInt().withMessage('Owner must be a user id'),
  body('birthdate').optional().isISO8601().toDate().withMessage('Birthdate must be a valid date'),
];

const catUpdateRules = [
  body('cat_name').optional().trim().isLength({min:1}).withMessage('Cat name cannot be empty'),
  body('weight').optional().isFloat({gt:0}).withMessage('Weight must be a positive number'),
  body('owner').optional().isInt().withMessage('Owner must be a user id'),
  body('birthdate').optional().isISO8601().toDate().withMessage('Birthdate must be a valid date'),
];

const loginRules = [
  body('username').trim().isLength({min:1}).withMessage('Username required'),
  body('password').isLength({min:1}).withMessage('Password required'),
];

export { userCreateRules, userUpdateRules, catCreateRules, catUpdateRules, loginRules };
