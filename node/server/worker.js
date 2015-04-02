process.on('uncaughtException', function(err) {
    console.error('Caught exception: ', err);
});

var config = require('../config/config');
var mongoose = require('mongoose');

module.exports = function() {
    /**
     * Main application entry file.
     * Please note that the order of loading is important.
     */
    
    var dbconn = {};

    for (var name in config.db.mongo) {
        dbconn[name] = mongoose.createConnection(config.db.mongo[name]);
    }

    // Init the express application
    var app = require('./server')(dbconn);

    // Start the app by listening on <port>
    app.listen(app.get('port'), app.get('ip'));

    console.log('depot worker server ' + process.pid + ' running on ' + app.get('port') + ' port...');
};