const Category = require("../models/Category");

const createCategory = async (req, res) => {
  const category = await Category.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(category);
};

const getCategories = async (req, res) => {
  const categories = await Category.find({
    user: req.user._id,
  });

  res.json(categories);
};

module.exports = {
  createCategory,
  getCategories,
};