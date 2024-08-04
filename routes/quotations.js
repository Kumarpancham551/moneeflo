const express = require('express');
const { viewQuotations } = require('../controllers/quotationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, viewQuotations);

module.exports = router;
