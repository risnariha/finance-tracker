const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
  const { title, amount, category, type, date } = req.body;

  if (!title || !amount || !type || !date) {
    return res.status(400).json({ message: "Missing required transaction fields" });
  }

  const transaction = await Transaction.create({
    title,
    amount,
    category,
    type,
    date,
    note: req.body.note,
    user: req.user._id,
  });

  res.status(201).json(transaction);
};

const getTransactions = async (req, res) => {
  const { startDate, endDate, category, type } = req.query;
  const query = { user: req.user._id };

  if (type) query.type = type;
  if (category) query.category = category;
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const transactions = await Transaction.find(query)
    .populate("category")
    .sort({ date: -1, createdAt: -1 });

  res.json(transactions);
};

const updateTransaction = async (req, res) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const { title, amount, category, type, date, note } = req.body;
  transaction.title = title ?? transaction.title;
  transaction.amount = amount ?? transaction.amount;
  transaction.category = category ?? transaction.category;
  transaction.type = type ?? transaction.type;
  transaction.date = date ?? transaction.date;
  transaction.note = note ?? transaction.note;

  await transaction.save();

  res.json(transaction);
};

const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.json({ message: "Transaction deleted" });
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};