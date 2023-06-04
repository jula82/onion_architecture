const { ObjectId } = require('mongodb');
const Book = require('../domain/book');

class IBookRepository {
  async findAll() {}

  async findById(id) {}

  async save(book) {}

  async updateOne(book) {}

  async delete(id) {}
}

module.exports = IBookRepository;
