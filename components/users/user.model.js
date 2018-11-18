const mongoose = require('mongoose');
const ObjectId = require('mongoose').Schema.ObjectId;

// TODO: email validator.
// TODO: password hash.
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'academic', 'administrator'],
      required: true,
      default: 'student',
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      get: () => '**********',
    },
    institution: {
      type: ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
    id: false,
  }
);

module.exports = mongoose.model('User', UserSchema);
