const express = require('express');
const { addProducts } = require('../controllers/productControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addProducts);

module.exports = router;
