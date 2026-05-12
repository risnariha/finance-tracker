const Budget = require("../models/Budget");

const createBudget = async (req, res) => {
  const budget = await Budget.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(budget);
};

const getBudgets = async (req, res) => {
  const budgets = await Budget.find({
    user: req.user._id,
  }).populate("category");

  res.json(budgets);
};

module.exports = {
  createBudget,
  getBudgets,
};