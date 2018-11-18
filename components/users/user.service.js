const UserModel = require('./user.model');

module.exports = (app) => {
  class UserService {
    static findById(userId) {
      return UserModel.findOne({ _id: userId })
        .then(user => user && user.toObject({ getters: true, versionKey: false }));
    }

    static findByUsername(username = '') {
      return UserModel.findOne({ username })
        .then(user => user && user.toObject({ versionKey: false }));
    }

    // TODO: password hash and salt.
    static create(payload) {
      const InstitutionService = app.services.InstitutionService;
      const user = new UserModel(payload);
      const error = user.validateSync(['name', 'email', 'role', 'username', 'password']);

      if (error) { return Promise.reject(error); }

      const email = user.email;
      const domain = email.substring(email.indexOf('@') + 1);

      return InstitutionService.findByDomain(domain)
        .then((institution = {}) => {
          if (institution) {
            user.institution = institution._id;
          }

          return user.save();
        });
    }
  }

  return UserService;
};
