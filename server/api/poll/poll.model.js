'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
        name: String,
        date: { type: Date, default: Date.now },
        owner: Schema.Types.ObjectId,
        option: Array,
        member: Array,
        expired: { type : Date, default: Date.now }
    }, 
    { 
        strict: false 
    });

    PollSchema.static('findByOwner', function (id, callback) {
        return this.find({ owner: id }, callback);
    });

module.exports = mongoose.model('Poll', PollSchema);