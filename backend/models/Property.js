const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String }
  },
  features: {
    beds: { type: Number, default: 0 },
    baths: { type: Number, default: 0 },
    areaSqFt: { type: Number, default: 0 }
  },
  images: [{ type: String }],
  status: { type: String, enum: ['Available', 'Under Contract', 'Sold'], default: 'Available' },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
