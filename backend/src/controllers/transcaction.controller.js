const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
  const transaction = await Transaction.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(transaction);
};

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({
    user: req.user._id,
  })
    .populate("category")
    .sort({ createdAt: -1 });

  res.json(transactions);
};

const deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);

  res.json({
    message: "Transaction deleted",
  });
};

module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
};