import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

export const createBudget = async (req, res) => {
  const { category, amount } = req.body;

  const existingBudget = await Budget.findOne({ user: req.user.id, category });
  if (existingBudget) {
    return res.status(400).json({ message: 'Budget for this category already exists' });
  }

  const budget = new Budget({
    user: req.user.id,
    category,
    amount,
  });

  await budget.save();
  res.status(201).json(budget);
};

export const getBudgets = async (req, res) => {
  const budgets = await Budget.find({ user: req.user.id });
  res.json(budgets);
};


export const getBudgetAlerts = async (req, res) => {
  const budgets = await Budget.find({ user: req.user.id });

  const alerts = [];
  for (const budget of budgets) {
    const totalSpentInCategory = await Transaction.aggregate([
      { $match: { user: req.user.id, category: budget.category, type: 'expense' } },
      { $group: { _id: null, totalSpent: { $sum: '$amount' } } },
    ]);

    const totalSpent = totalSpentInCategory[0] ? totalSpentInCategory[0].totalSpent : 0;

    if (totalSpent >= budget.amount) {
      alerts.push({
        category: budget.category,
        budgetAmount: budget.amount,
        totalSpent,
        status: 'Exceeded',
      });
    } else if (totalSpent >= budget.amount * 0.8) {
      alerts.push({
        category: budget.category,
        budgetAmount: budget.amount,
        totalSpent,
        status: 'Warning',
      });
    }
  }

  res.json(alerts);
};


export const updateBudget = async (req, res) => {
  const { category, amount } = req.body;
  const budget = await Budget.findOne({ user: req.user.id, category });

  if (!budget) {
    return res.status(404).json({ message: 'Budget not found' });
  }

  budget.amount = amount;
  await budget.save();
  res.json(budget);
};


export const deleteBudget = async (req, res) => {
  const { category } = req.params;
  const budget = await Budget.findOneAndDelete({ user: req.user.id, category });

  if (!budget) {
    return res.status(404).json({ message: 'Budget not found' });
  }

  res.json({ message: 'Budget deleted' });
};


