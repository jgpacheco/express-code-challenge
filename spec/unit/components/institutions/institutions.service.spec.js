require('rootpath')();
const proxyquire = require('proxyquire');

describe('InstitutionService', () => {
  beforeAll(() => {
    this.appStub = {};
    this.InstitutionModelStub = {
      findOne: jasmine.createSpy('InstitutionModel.findOne').and.returnValue(Promise.resolve()),
      create: jasmine.createSpy('InstitutionModel.create').and.returnValue(Promise.resolve()),
    };
    this.InstitutionService = proxyquire(
      'components/institutions/institution.service',
      { './institution.model': this.InstitutionModelStub }
    )(this.appStub);
  });

  describe('#findByDomain', () => {
    describe('when institution is found', () => {
      beforeAll(() => {
        this.domain = 'domain.com';
        this.institution = {
          toObject: jasmine.createSpy('toObject').and.returnValue({ domain: this.domain }),
        };
        this.InstitutionModelStub.findOne = jasmine.createSpy('InstitutionModel.findOne')
          .and.returnValue(Promise.resolve(this.institution));
        this.result = this.InstitutionService.findByDomain(this.domain);
      });

      it('should return a promise resolved with the institution', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((institution) => {
          expect(institution.domain).toBe(this.domain);
          done();
        });
      });
    });

    describe('when institution is not found', () => {
      beforeAll(() => {
        this.InstitutionModelStub.findOne = jasmine.createSpy('InstitutionModel.findOne')
          .and.returnValue(Promise.resolve(null));
        this.result = this.InstitutionService.findByDomain('');
      });

      it('should return a promise resolved with null', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((institution) => {
          expect(institution).toBeNull();
          done();
        });
      });
    });
  });

  describe('#create', () => {
    describe('when institution is created successfully', () => {
      beforeAll(() => {
        this.domain = 'domain.com';
        this.institution = {
          toObject: jasmine.createSpy('toObject').and.returnValue({ domain: this.domain }),
        };
        this.InstitutionModelStub.create = jasmine.createSpy('InstitutionModel.create')
          .and.returnValue(Promise.resolve(this.institution));
        this.result = this.InstitutionService.create({});
      });

      it('should return a promise resolved with the created institution', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((institution) => {
          expect(institution.domain).toBe(this.domain);
          done();
        });
      });
    });

    describe('when institution was not created', () => {
      beforeAll(() => {
        this.InstitutionModelStub.create = jasmine.createSpy('InstitutionModel.create')
          .and.returnValue(Promise.resolve(null));
        this.result = this.InstitutionService.create({});
      });

      it('should return a promise resolved with null', (done) => {
        expect(this.result).toEqual(jasmine.any(Promise));
        this.result.then((institution) => {
          expect(institution).toBeNull();
          done();
        });
      });
    });
  });
});
