const express = require('express');
const router = express.Router();
const {createBook,getBookById, getAllBooks, updateBook, deleteBook } = require('../controllers/bookController');
const protect = require('../middleware/authMiddleware');

// Create a new book
router.post('/create', createBook);

// Retrieve a specific book by its ID
router.get('/:id',protect, getBookById);

//get all the books

router.get('/', getAllBooks)

// Update an existing book
router.put('/:id',protect, updateBook);

// Delete a book
router.delete('/:id',protect, deleteBook);

module.exports = router;
