const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BinSchema = new Schema({
  bin:  {
    type: String,
    required: true,
    unique: true
  },
  lastAudit: {
    type: Date,
    required: true,
  },
  auditHistory: {
    type: Array,
    required: true
  }
});

const Bin = mongoose.model('Bin', BinSchema );

module.exports = Bin;
