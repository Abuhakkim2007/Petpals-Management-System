const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('petId');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET appointments by pet ID
router.get('/pet/:petId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ petId: req.params.petId }).populate('petId');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    await savedAppointment.populate('petId');
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('petId');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;