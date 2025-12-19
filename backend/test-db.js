const mongoose = require('mongoose');
require('dotenv').config();

const Pet = require('./models/Pet');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Add sample pet
    const pet = new Pet({
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      owner: 'John Doe',
      contact: '123-456-7890'
    });
    
    await pet.save();
    console.log('Pet saved:', pet);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });