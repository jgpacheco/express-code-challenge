require('rootpath')();
const proxyquire = require('proxyquire');

describe('BookService', () => {
  beforeAll(() => {
    this.appStub = {};
    this.BookModelStub = {
      find: jasmine.createSpy('BookModel.find').and.returnValue(Promise.resolve()),
      create: jasmine.createSpy('BookModel.create').and.returnValue(Promise.resolve()),
    };
    this.BookService = proxyquire(
      'components/books/book.service',
      { './book.model': this.BookModelStub }
    )(this.appStub);
  });

  describe('#list', () => {
    beforeAll(() => {
      this.BookModelStub.find = jasmine.createSpy('BookModel.find')
        .and.returnValue(Promise.resolve([]));
      this.result = this.BookService.list('');
    });

    it('should return a promise resolved with an array of books', (done) => {
      expect(this.result).toEqual(jasmine.any(Promise));
      this.result.then((books) => {
        expect(books).toEqual(jasmine.any(Array));
        done();
      });
    });
  });

  describe('#create', () => {
    describe('when book is created successfully', () => {
      beforeAll(() => {
        this.bookId = 1;
        this.book = {
          toObject: jasmine.createSpy('toObject').and.returnValue({ _id: this.bookId }),
        };
        this.BookModelStub.create = jasmine.createSpy('BookModel.create')
          .and.returnValue(Promise.resolve(this.book));
        this.result = this.BookService.create({});
      });

      it('should return a promise resolved with created book', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((book) => {
          expect(book._id).toBe(this.bookId);
          done();
        });
      });
    });

    describe('when book was not created', () => {
      beforeAll(() => {
        this.bookId = 1;
        this.BookModelStub.create = jasmine.createSpy('BookModel.create')
          .and.returnValue(Promise.resolve(null));
        this.result = this.BookService.create({});
      });

      it('should return a promise resolved with null', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((book) => {
          expect(book).toBeNull();
          done();
        });
      });
    });
  });
});
