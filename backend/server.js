require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const transactionRoutes = require("./routes/transaction.routes");
const categoryRoutes = require("./routes/category.routes");
const budgetRoutes = require("./routes/budget.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

////////

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


////////

app.use("/api/auth", authRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/budgets", budgetRoutes);

app.use("/api/dashboard", dashboardRoutes);

///////

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Finance Tracker API Running Successfully",
  });
});


////////

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database Connection Error:", error);
  });