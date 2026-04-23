const Deal = require('../models/Deal');

exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find().populate('leadId', 'name').populate('propertyId', 'title');
    res.status(200).json({ success: true, count: deals.length, data: deals });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createDeal = async (req, res) => {
  try {
    const deal = await Deal.create(req.body);
    res.status(201).json({ success: true, data: deal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateDealStage = async (req, res) => {
  try {
    const { stage } = req.body;
    const deal = await Deal.findByIdAndUpdate(req.params.id, { stage }, { new: true });
    if (!deal) return res.status(404).json({ success: false, message: 'Deal not found' });
    res.status(200).json({ success: true, data: deal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
