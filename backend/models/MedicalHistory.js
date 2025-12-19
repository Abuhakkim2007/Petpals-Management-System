const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  diagnosis: {
    type: String
  },
  treatment: {
    type: String
  },
  doctor: {
    type: String,
    required: true
  },
  cost: {
    type: Number
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);