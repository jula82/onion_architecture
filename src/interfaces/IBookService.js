const Book = require('../domain/book');

class IBookService {
  async getAllBooks() {}

  async addBook(title, author, publishedAt) {}

  async updateBook(id, title, author, publishedAt) {}

  async deleteBook(id) {}
}

module.exports = IBookService;
