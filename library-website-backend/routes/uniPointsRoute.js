const express = require('express');
const { checkUniPoints } = require('../controllers/uniPointsController');
const router = express.Router();

router.post('/showUniPoints',checkUniPoints)

module.exports = router