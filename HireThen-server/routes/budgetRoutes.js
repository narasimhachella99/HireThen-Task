
import express from 'express';
import {
  createBudget,
  getBudgets,
  getBudgetAlerts,
  updateBudget,
  deleteBudget,
} from '../controllers/budgetController.js';
import protect from '../middleware/authMiddleware.js';

const budgetRouter = express.Router();


budgetRouter.route('/').post(protect, createBudget);


budgetRouter.route('/').get(protect, getBudgets);


budgetRouter.route('/alerts').get(protect, getBudgetAlerts);


budgetRouter.route('/:category').put(protect, updateBudget);


budgetRouter.route('/:category').delete(protect, deleteBudget);

export default budgetRouter;
