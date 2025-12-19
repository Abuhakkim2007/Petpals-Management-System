const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// GET all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new pet
router.post('/', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const savedPet = await pet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update pet
router.put('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE pet
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;