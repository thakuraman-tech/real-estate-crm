const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stage: { type: String, enum: ['Negotiation', 'Agreement', 'Closed', 'Lost'], default: 'Negotiation' },
  amount: { type: Number, required: true },
  commission: { type: Number },
  closingDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
