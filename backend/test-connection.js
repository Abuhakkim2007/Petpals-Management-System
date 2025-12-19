const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mernpjt')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('📁 Database: mernpjt');
    
    // Create a simple test collection
    const testSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const Test = mongoose.model('Test', testSchema);
    
    const testDoc = new Test({ name: 'Connection Test' });
    return testDoc.save();
  })
  .then((doc) => {
    console.log('✅ Test document saved:', doc);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });