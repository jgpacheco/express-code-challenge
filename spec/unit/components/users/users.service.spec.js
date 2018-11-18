require('rootpath')();
const proxyquire = require('proxyquire');

describe('UserService', () => {
  beforeAll(() => {
    this.domain = 'domain.com';
    this.user = {
      email: `user@${this.domain}`,
      save: jasmine.createSpy('save').and.returnValue(null),
      validateSync: jasmine.createSpy('validateSync').and.returnValue(null),
    };
    this.institution = { _id: 1 };
    this.appStub = {
      services: {
        InstitutionService: {
          findByDomain: jasmine.createSpy('InstitutionService.findByDomain')
            .and.returnValue(Promise.resolve(this.institution)),
        },
      },
    };
    this.UserModelStub = jasmine.createSpy('UserModel').and.returnValue(this.user);
    this.UserModelStub.findOne = jasmine.createSpy('UserModel.findOne').and.returnValue(Promise.resolve());
    this.UserModelStub.create = jasmine.createSpy('UserModel.create').and.returnValue(Promise.resolve());

    this.UserService = proxyquire(
      'components/users/user.service',
      { './user.model': this.UserModelStub }
    )(this.appStub);
  });

  describe('#findById', () => {
    describe('when user is found', () => {
      beforeAll(() => {
        this.userId = '1';
        this.user.toObject = jasmine.createSpy('toObject').and.returnValue({ _id: this.userId });
        this.UserModelStub.findOne = jasmine.createSpy('UserModel.findOne').and.returnValue(Promise.resolve(this.user));
        this.result = this.UserService.findById(this.userId);
      });

      it('should return a promise resolved with the user', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((user) => {
          expect(user._id).toBe(this.userId);
          done();
        });
      });
    });

    describe('when user is not found', () => {
      beforeAll(() => {
        this.UserModelStub.findOne = jasmine.createSpy('UserModel.findOne').and.returnValue(Promise.resolve(null));
        this.result = this.UserService.findById(this.userId);
      });

      it('should return a promise resolved with user', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((user) => {
          expect(user).toBeNull();
          done();
        });
      });
    });
  });

  describe('#findByUsername', () => {
    describe('when user is found', () => {
      beforeAll(() => {
        this.username = 'username';
        this.user.toObject = jasmine.createSpy('toObject').and.returnValue({ username: this.username });
        this.UserModelStub.findOne = jasmine.createSpy('UserModel.findOne').and.returnValue(Promise.resolve(this.user));
        this.result = this.UserService.findById(this.username);
      });

      it('should return a promise resolved with the user', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((user) => {
          expect(user.username).toBe(this.username);
          done();
        });
      });
    });

    describe('when user is not found', () => {
      beforeAll(() => {
        this.UserModelStub.findOne = jasmine.createSpy('UserModel.findOne').and.returnValue(Promise.resolve(null));
        this.result = this.UserService.findById(this.username);
      });

      it('should return a promise resolved with user', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((user) => {
          expect(user).toBeNull();
          done();
        });
      });
    });
  });

  describe('#create', () => {
    describe('when user data is invalid', () => {
      // TODO:
    });

    describe('when user email domain links to an institution', () => {
      beforeAll(() => {
        this.result = this.UserService.create({});
      });

      it('should create user linked to the institution', (done) => {
        expect(this.appStub.services.InstitutionService.findByDomain)
          .toHaveBeenCalledWith(this.domain);
        this.appStub.services.InstitutionService.findByDomain().then(() => {
          expect(this.user.institution).toBeDefined();
          done();
        });
      });
    });

    describe('when user email domain do not link to an institution', () => {
      // TODO:
    });
  });
});
