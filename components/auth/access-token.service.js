const uid = require('uid-safe');
const AccessTokenModel = require('./access-token.model');

module.exports = (/* app */) => {
  class AccessTokenService {
    static find(token) {
      return AccessTokenModel.findOne({ access_token: token })
        .then(accessToken => accessToken && accessToken.toObject({ versionKey: false }));
    }

    static create(userId) {
      return AccessTokenModel.findOneAndUpdate(
        { _id: userId },
        { access_token: uid.sync(18) },
        { new: true, upsert: true }
      ).then(accessToken => accessToken && accessToken.toObject({ getters: true, versionKey: false }));
    }
  }

  return AccessTokenService;
};
