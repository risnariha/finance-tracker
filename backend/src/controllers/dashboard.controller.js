const Transaction = require("../models/Transaction");

const getDashboardSummary = async (req, res) => {
  const transactions = await Transaction.find({
    user: req.user._id,
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  res.json({
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    transactions,
  });
};

module.exports = {
  getDashboardSummary,
};