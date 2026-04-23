const Property = require('../models/Property');

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('agentId', 'name email');
    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
