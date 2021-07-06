import express from 'express';

const router = express.Router();

import authenticateToken from './authenticateToken';
import RecipesController from '../controllers/RecipesController';
import UserController from '../controllers/UserController';
import RatingController from '../controllers/RatingController';

//  user routes
router.get('/login', UserController.login);

// recipes routes
router.post('/recipes', authenticateToken, RecipesController.create);
router.get('/recipes/', RecipesController.getAll);
router.get('/recipes/:id', RecipesController.getOne);
router.patch('/recipes/:id', authenticateToken, RecipesController.update);
router.delete('/recipes/:id', authenticateToken, RecipesController.delete);

// rating routes
router.post('/recipes/:id/rate', RatingController.create);

export {router};
