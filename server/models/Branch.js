const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, default: 'Mumbai' },
  phone: { type: String },
  email: { type: String },
  mapLink: { type: String },
  timings: { type: String, default: 'Mon–Sat: 6:00 AM – 8:00 PM' },
  isActive: { type: Boolean, default: true },
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);
