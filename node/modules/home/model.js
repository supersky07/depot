'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

module.exports = function (dbconn) {
    var Schema = mongoose.Schema;

    /**
     * user Schema
     */
    var userSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: String,
            required: true,
            trim: true
        }
    });

    dbconn.depot.model('user', userSchema);
};