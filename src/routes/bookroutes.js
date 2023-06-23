const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, publishedDate, description } = req.body;
    const book = new Book({ title, author, genre, publishedDate, description });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve a specific book by its ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing book
router.put('/:id', async (req, res) => {
  try {
    const { title, author, genre, publishedDate, description } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publishedDate, description },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
