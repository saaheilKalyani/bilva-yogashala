const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['kids', 'adult', 'senior', 'therapy'], required: true },
  instructor: { type: String, required: true },
  timing: { type: String, required: true },
  duration: { type: String, default: '60 min' },
  fees: { type: Number, required: true },
  capacity: { type: Number, default: 20 },
  seatsAvailable: { type: Number, default: 20 },
  type: { type: String, enum: ['online', 'offline', 'hybrid'], default: 'offline' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  description: { type: String },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'all'], default: 'all' },
  daysOfWeek: [{ type: String }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);
