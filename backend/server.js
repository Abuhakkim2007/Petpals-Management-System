const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://petpals-frontend.onrender.com'] 
    : ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('Database:', mongoose.connection.db.databaseName);
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Log database operations
mongoose.set('debug', true);

// Test route for database connection
app.get('/api/test', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const status = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  res.json({
    database: status[dbStatus],
    dbName: mongoose.connection.db?.databaseName || 'Not connected'
  });
});

// Routes
app.use('/api/pets', require('./routes/pets'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/medical-history', require('./routes/medicalHistory'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});