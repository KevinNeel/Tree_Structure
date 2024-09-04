import { body } from "express-validator"

export const validate_Register = [
    body('name').notEmpty().withMessage('Field cannot be empty'),
    body('email').isEmail().withMessage('Invalid Email Type'),
    body('password').isLength({ min: 6 }).withMessage('Minimum 6 length of characters are required')
]

export const validate_Login = [
    body('email').isEmail().withMessage('Invalid Email Type'),
    body('password').notEmpty().withMessage('Field cannot be empty')
]

export const validate_Password = [
    body('password').isLength({ min: 6 }).withMessage('Min 6 length characters required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Min 6 length characters required')
]
