const Book = require('../models/books');

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, genre, publishedDate, description } = req.body;
    const book = new Book({ title, author, genre, publishedDate, description });
    await book.save();
    res.status(201).json(book);
    res.send("book created")
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// display all the books

const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    res.send("get all books")
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
// Retrieve a specific book by its ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing book
const updateBook = async (req, res) => {
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
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
}