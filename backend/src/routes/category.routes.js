const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../controllers/category.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createCategory);
router.get("/", protect, getCategories);

module.exports = router;