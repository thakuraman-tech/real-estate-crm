require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Real Estate CRM API is running' });
});

// Import and mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/deals', require('./routes/dealRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
