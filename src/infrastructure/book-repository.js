const { ObjectId } = require('mongodb');
const Book = require('../domain/book');
const IRepository = require('../interfaces/IRepository');

class BookRepository extends IRepository {
  constructor(database) {
    super();
    this.collection = database.collection('books');
  }

  async findAll() {
    const books = await this.collection.find().toArray();

    return books.map((book) => new Book(book._id, book.title, book.author, book.publishedAt));
  }

  async findById(id) {
    const book = await this.collection.findOne({ _id: ObjectId.createFromHexString(id) });
  
    if (!book) {
      return null;
    }
  
    return new Book(book.id, book.title, book.author, book.publishedAt);
  }

  async save(book) {
    const result = await this.collection.insertOne({
        title: book.title,
        author: book.author,
        publishedAt: book.publishedAt
    });

    return result;
  }

  async updateOne(book) {
    const result = await this.collection.updateOne({ _id: new ObjectId(book.id) }, { $set: {
        title: book.title,
        author: book.author,
        publishedAt: book.publishedAt,
    }});

    return result;
  }

  async delete(id) {
    await this.collection.deleteOne({ _id: ObjectId.createFromHexString(id) });
  }
}

module.exports = BookRepository;
