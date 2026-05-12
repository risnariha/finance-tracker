const Budget = require("../models/Budget");

const createBudget = async (req, res) => {
  const { category, amount, month } = req.body;

  if (!category || !amount || !month) {
    return res.status(400).json({ message: "Category, amount, and month are required" });
  }

  const budget = await Budget.create({
    category,
    amount,
    month,
    user: req.user._id,
  });

  const populatedBudget = await budget.populate("category");
  res.status(201).json(populatedBudget);
};

const getBudgets = async (req, res) => {
  const budgets = await Budget.find({
    user: req.user._id,
  }).populate("category");

  res.json(budgets);
};

const updateBudget = async (req, res) => {
  const budget = await Budget.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { category: req.body.category, amount: req.body.amount, month: req.body.month },
    { new: true, runValidators: true }
  ).populate("category");

  if (!budget) {
    return res.status(404).json({ message: "Budget not found" });
  }

  res.json(budget);
};

const deleteBudget = async (req, res) => {
  const budget = await Budget.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!budget) {
    return res.status(404).json({ message: "Budget not found" });
  }

  res.json({ message: "Budget deleted" });
};

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
};