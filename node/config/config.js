'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    app: {
        title: 'depot',
        description: 'for you'
    },
    root: rootPath + '\\app',
    port: process.env.PORT || 3000,
    ip: process.env.IP || '127.0.0.1',
    templateEngine: 'html',
    db: {
        mongo: {
        	//mongodb://user:pass@localhost:port/database
            depot: 'mongodb://localhost:27017/test'
        }
    }
};