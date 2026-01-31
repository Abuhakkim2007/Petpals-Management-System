const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend API is working!', timestamp: new Date() });
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`✅ Test API: http://localhost:${PORT}/api/test`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });