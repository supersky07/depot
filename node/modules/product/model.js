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
    var productSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        total: {
            type: Number,
            required: true,
            trim: true
        },
        left: {
            type: Number,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            trim: true
        },
        sale: {
            type: Number,
            required: true,
            trim: true
        }
    });

    dbconn.depot.model('product', productSchema);
};