const mongoose = require('mongoose');
const ObjectId = require('mongoose').Schema.ObjectId;

// TODO: password hash and salt.
// TODO: expire documents.
const AccessTokenSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
      unique: true,
      get: value => `Bearer ${value}`,
    },
  },
  {
    strict: true,
    collection: 'access_token',
    versionKey: false,
    id: false,
  }
);

module.exports = mongoose.model('AccessToken', AccessTokenSchema);
