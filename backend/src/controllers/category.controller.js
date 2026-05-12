const Category = require("../models/Category");

const createCategory = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "Category name and type are required" });
  }

  const category = await Category.create({
    name,
    type,
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

const updateCategory = async (req, res) => {
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { name: req.body.name, type: req.body.type },
    { new: true, runValidators: true }
  );

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};

const deleteCategory = async (req, res) => {
  const category = await Category.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json({ message: "Category deleted" });
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};