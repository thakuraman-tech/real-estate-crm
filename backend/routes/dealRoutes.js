const express = require('express');
const { getDeals, createDeal, updateDealStage } = require('../controllers/dealController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getDeals)
  .post(createDeal);

router.put('/:id/stage', updateDealStage);

module.exports = router;
