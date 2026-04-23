const express = require('express');
const { getProperties, createProperty, updateProperty } = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Allow public to get properties, but protect create/update
router.get('/', getProperties);

router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);

module.exports = router;
