const express = require("express");
const BookController = require('../controller/books.controller')
const router = express.Router();

router.post('/create', BookController.createBook);

router.put('/update/:id', BookController.updateBook);

router.get('/get', BookController.getBook);


module.exports = router;