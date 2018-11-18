require('rootpath')();
const proxyquire = require('proxyquire');

describe('AccessTokenService', () => {
  beforeAll(() => {
    this.appStub = {};
    this.AccessTokenModelStub = {
      findOne: jasmine.createSpy('AccessTokenModel.findOne').and.returnValue(Promise.resolve()),
      findOneAndUpdate: jasmine.createSpy('AccessTokenModel.findOneAndUpdate').and.returnValue(Promise.resolve()),
    };
    this.AccessTokenService = proxyquire(
      'components/auth/access-token.service',
      { './access-token.model': this.AccessTokenModelStub }
    )(this.appStub);
  });

  describe('#find', () => {
    describe('when access token is found', () => {
      beforeAll(() => {
        this.userId = 1;
        this.accessToken = {
          toObject: jasmine.createSpy('toObject').and.returnValue({ _id: this.userId }),
        };
        this.AccessTokenModelStub.findOne = jasmine.createSpy('AccessTokenModel.findOne')
          .and.returnValue(Promise.resolve(this.accessToken));
        this.result = this.AccessTokenService.find('');
      });

      it('should return a promise resolved with the access token', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((accessToken) => {
          expect(accessToken._id).toBe(this.userId);
          done();
        });
      });
    });

    describe('when access token is not found', () => {
      beforeAll(() => {
        this.AccessTokenModelStub.findOne = jasmine.createSpy('AccessTokenModel.findOne')
          .and.returnValue(Promise.resolve(null));
        this.result = this.AccessTokenService.find('');
      });

      it('should return a promise resolved with null', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((accessToken) => {
          expect(accessToken).toBeNull();
          done();
        });
      });
    });
  });

  describe('#create', () => {
    describe('when access token is created successfully', () => {
      beforeAll(() => {
        this.userId = 1;
        this.accessToken = {
          toObject: jasmine.createSpy('toObject').and.returnValue({ _id: this.userId }),
        };
        this.AccessTokenModelStub.findOneAndUpdate = jasmine.createSpy('AccessTokenModel.findOneAndUpdate')
          .and.returnValue(Promise.resolve(this.accessToken));
        this.result = this.AccessTokenService.create(this.userId);
      });

      it('should return a promise resolved with the created access token', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((accessToken) => {
          expect(accessToken._id).toBe(this.userId);
          done();
        });
      });
    });

    describe('when access token was not created', () => {
      beforeAll(() => {
        this.userId = 1;
        this.AccessTokenModelStub.findOneAndUpdate = jasmine.createSpy('AccessTokenModel.findOneAndUpdate')
          .and.returnValue(Promise.resolve(null));
        this.result = this.AccessTokenService.create(this.userId);
      });

      it('should return a promise resolved with null', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((accessToken) => {
          expect(accessToken).toBeNull();
          done();
        });
      });
    });
  });
});
