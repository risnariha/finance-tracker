const express = require("express");
const {
  createBudget,
  getBudgets,
} = require("../controllers/budget.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createBudget);
router.get("/", protect, getBudgets);

module.exports = router;