
import express from 'express';
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';
import  protect from '../middleware/authMiddleware.js';
const transactionRouter = express.Router();

transactionRouter.route('/').post(protect, createTransaction).get(protect, getTransactions);
transactionRouter
  .route('/:id')
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

export default transactionRouter;
