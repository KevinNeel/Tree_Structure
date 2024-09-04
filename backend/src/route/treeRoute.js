import express from 'express';

//Middleware
import authMiddleware from '../middleware/authMiddleware.js';

//Validation for tree


// Controller
import { createTree, getTree } from '../controller/treeController.js';

const tree = express.Router();

tree.get('', authMiddleware, getTree)
tree.post('', authMiddleware, createTree)


export default tree