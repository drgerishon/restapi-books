const express = require('express');
const router = express.Router();
const {createBook,getBookById, getAllBooks, updateBook, deleteBook } = require('../controllers/bookController');

// Create a new book
router.post('/', createBook);

// Retrieve a specific book by its ID
router.get('/:id', getBookById);

//get all the books

router.get('/', getAllBooks)

// Update an existing book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

module.exports = router;
