// server/models/lead.model.js
const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  address: { type: String, required: true, trim: true },
  zipCode: { type: String, required: true, trim: true },
  source: { type: String, default: 'Landing Page CTA' },
  checkedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', LeadSchema);