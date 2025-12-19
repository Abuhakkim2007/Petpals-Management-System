/* eslint-disable no-undef */
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: String,
  age: Number,
  owner: { type: String, required: true },
  ownerPhone: String,
  doctor: String,
  dutyInCharge: String,
  isVaccinated: { type: Boolean, default: false },
  vaccinationDate: Date,
  isConsulted: { type: Boolean, default: false },
  lastConsultDate: Date,
  nextConsultDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);