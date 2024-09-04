import express from 'express';

import { validate_Register, validate_Login } from '../validation/validation.js';

import { register, login } from '../controller/userController.js';

const user = express.Router();

user.post('/register', validate_Register, register)
user.post('/login', validate_Login, login)

export default user