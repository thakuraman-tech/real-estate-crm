const express = require('express');
const { getLeads, createLead, updateLead, deleteLead } = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/:id')
  .put(updateLead)
  .delete(deleteLead);

module.exports = router;
