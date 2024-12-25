const express = require('express');
const { createBook, showBook, getBookById } = require('../controllers/createBookController');
const router = express.Router();

router.post('/createBook', createBook);
router.get('/showBook', showBook);
router.get('/getBookById/:id', getBookById);

module.exports = router;
