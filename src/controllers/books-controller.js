const express = require('express');

function createBooksController(bookService) {

  const router = express.Router();

  router.get('/', async (req, res) => {
    const books = await bookService.getAllBooks();

    res.json(books);
  });

  router.post('/', async (req, res) => {
    const { title, author, publishedAt } = req.body;
    const savedBook = await bookService.addBook(title, author, publishedAt);

    res.json(savedBook);
  });

  router.put('/:id', async (req, res) => {
    const { title, author, publishedAt } = req.body;
    const updatedBook = await bookService.updateBook(req.params.id, title, author, publishedAt);

    res.json(updatedBook);
  });

  router.delete('/:id', async (req, res) => {
    await bookService.deleteBook(req.params.id);

    res.sendStatus(204);
  });

  return router;
}

module.exports = createBooksController;
