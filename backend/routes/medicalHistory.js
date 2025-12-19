const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');

// GET all medical history records
router.get('/', async (req, res) => {
  try {
    const records = await MedicalHistory.find().populate('petId');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET medical history by pet ID
router.get('/pet/:petId', async (req, res) => {
  try {
    const records = await MedicalHistory.find({ petId: req.params.petId }).populate('petId');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new medical history record
router.post('/', async (req, res) => {
  try {
    const record = new MedicalHistory(req.body);
    const savedRecord = await record.save();
    await savedRecord.populate('petId');
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update medical history record
router.put('/:id', async (req, res) => {
  try {
    const record = await MedicalHistory.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('petId');
    if (!record) return res.status(404).json({ message: 'Medical history record not found' });
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE medical history record
router.delete('/:id', async (req, res) => {
  try {
    const record = await MedicalHistory.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Medical history record not found' });
    res.json({ message: 'Medical history record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;