const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/transactions', require('./routes/transaction.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/budgets', require('./routes/budget.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Finance Tracker API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});