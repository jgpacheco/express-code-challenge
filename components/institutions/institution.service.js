const InstitutionModel = require('./institution.model');

module.exports = (/* app */) => {
  class InstitutionService {
    static findByDomain(domain) {
      return InstitutionModel.findOne({ domain })
        .then(institution => institution && institution.toObject({ versionKey: false }));
    }

    static create(payload) {
      return InstitutionModel.create(payload)
        .then(institution => institution && institution.toObject({ getters: true, versionKey: false }));
    }
  }

  return InstitutionService;
};
