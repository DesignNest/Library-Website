const express = require('express');
const { purchaseBook } = require('../controllers/purchaseBookController');
const router = express.Router();

router.post('/purchaseBook', purchaseBook)
module.exports = router;