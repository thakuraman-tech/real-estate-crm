const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  source: { type: String, enum: ['Website', 'Ads', 'Referral', 'Direct', 'Other'], default: 'Other' },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'], default: 'New' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  budget: { type: Number },
  preferences: {
    propertyType: { type: String },
    location: { type: String }
  },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
