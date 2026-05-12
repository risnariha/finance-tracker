const express = require("express");
const {
  createTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transaction.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);

module.exports = router;