const mongoose = require('mongoose');

// TODO: url validator.
const InstitutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    domain: {
      type: String,
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

module.exports = mongoose.model('Institution', InstitutionSchema);
