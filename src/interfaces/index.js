const express = require('express');
const bodyParser = require('body-parser');
const BookService = require('../application/book-service');
const BookRepository = require('../infrastructure/book-repository');
const mongoose = require('mongoose');
const createBooksController = require('../controllers/books-controller');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 9500;

(async function () {
  try {
    mongoose.connect('mongodb+srv://bookstore:rnvfhe6ri7gjM0Ns@cluster0.iyv0uaz.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'bookstore'
      }).then(() => {
        console.log('Database connection is ready');

        const db = mongoose.connection;
        const bookRepository = new BookRepository(db);
        const bookService = new BookService(bookRepository);
        const booksController = createBooksController(bookService);

        app.use('/books', booksController);
      }).catch((error) => {
        console.error('Error starting server:', error);
      });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
