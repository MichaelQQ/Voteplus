//'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  owner: Schema.Types.ObjectId
}, { strict: false });

module.exports = mongoose.model('Poll', PollSchema);