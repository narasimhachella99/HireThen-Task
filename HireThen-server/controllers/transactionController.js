
import Transaction from '../models/Transaction.js';


export const createTransaction = async (req, res) => {
  const { description, amount, type, category, isRecurring } = req.body;

  const transaction = new Transaction({
    description,
    amount,
    type,
    category,
    isRecurring,
    user: req.user.id,
  });

  await transaction.save();
  res.status(201).json(transaction);
};

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id });
  res.json(transactions);
};


export const updateTransaction = async (req, res) => {
  const { description, amount, type, category, isRecurring } = req.body;
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  if (transaction.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  transaction.description = description;
  transaction.amount = amount;
  transaction.type = type;
  transaction.category = category;
  transaction.isRecurring = isRecurring;

  await transaction.save();
  res.json(transaction);
};

export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  if (transaction.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await transaction.remove();
  res.json({ message: 'Transaction removed' });
};

