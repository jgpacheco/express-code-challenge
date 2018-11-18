const BookModel = require('./book.model');

module.exports = (/* app */) => {
  class BookService {
    static list(institution) {
      return BookModel.find({ institutions: institution })
        .then((books = []) => books.map(book => book.toObject({ getters: true, versionKey: false })));
    }

    static create(payload) {
      return BookModel.create(payload)
        .then(book => book && book.toObject({ getters: true, versionKey: false }));
    }
  }

  return BookService;
};
