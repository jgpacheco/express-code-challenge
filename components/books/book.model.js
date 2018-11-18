const mongoose = require('mongoose');
const ObjectId = require('mongoose').Schema.ObjectId;

const BookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    institutions: {
      type: [ObjectId],
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
    id: false,
  }
);

module.exports = mongoose.model('Book', BookSchema);
