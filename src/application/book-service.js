const Book = require('../domain/book');
const IBookService = require('../interfaces/IBookService');

class BookService extends IBookService {

  constructor(bookRepository) {
    super();
    this.bookRepository = bookRepository;
  }

  async getAllBooks() {
    const books = await this.bookRepository.findAll();

    return books;
  }

  async addBook(title, author, publishedAt) {
    const book = new Book(null, title, author, publishedAt);
    
    const savedBook = await this.bookRepository.save(book);

    return savedBook;
  }

  async updateBook(id, title, author, publishedAt) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error('Book not found');
    }

    const updatedBook = new Book(id,title, author, publishedAt);

    await this.bookRepository.updateOne(updatedBook);

    return updatedBook;
  }

  async deleteBook(id) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error('Book not found');
    }

    await this.bookRepository.delete(id);
  }
}

module.exports = BookService;
