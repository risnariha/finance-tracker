const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");

const formatMonthKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const getDashboardSummary = async (req, res) => {
  const transactions = await Transaction.find({
    user: req.user._id,
  }).populate("category");

  const budgets = await Budget.find({ user: req.user._id }).populate("category");

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, item) => {
      const name = item.category?.name || "Uncategorized";
      acc[name] = (acc[name] || 0) + item.amount;
      return acc;
    }, {});

  const expenseDistribution = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));

  const monthlyMap = transactions.reduce((acc, item) => {
    const monthKey = formatMonthKey(item.date);
    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expenses: 0 };
    }
    if (item.type === "income") {
      acc[monthKey].income += item.amount;
    } else {
      acc[monthKey].expenses += item.amount;
    }
    return acc;
  }, {});

  const monthlySummary = Object.entries(monthlyMap)
    .map(([month, values]) => ({ month, ...values }))
    .sort((a, b) => (a.month > b.month ? 1 : -1));

  const budgetDetails = budgets.map((budget) => {
    const spent = transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          formatMonthKey(transaction.date) === budget.month &&
          String(transaction.category?._id) === String(budget.category?._id)
      )
      .reduce((acc, item) => acc + item.amount, 0);

    const usage = budget.amount > 0 ? Math.min(100, (spent / budget.amount) * 100) : 0;

    return {
      _id: budget._id,
      category: budget.category,
      amount: budget.amount,
      month: budget.month,
      spent,
      usage,
      exceeded: spent > budget.amount,
    };
  });

  res.json({
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    transactions,
    expenseDistribution,
    monthlySummary,
    budgetDetails,
  });
};

module.exports = {
  getDashboardSummary,
};