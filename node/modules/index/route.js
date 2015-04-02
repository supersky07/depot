var path = require('path');
var config = require('../../config/config');

module.exports = function (app) {
    app.get('/', function(req, res){
    	var html = path.normalize(config.root + '\\index.html');
    	res.sendfile(html);
    });

    app.get('/home', function(req, res){
    	var html = path.normalize(config.root + '\\home.html');
    	res.sendfile(html);
    });

    app.get('/product', function(req, res){
    	var html = path.normalize(config.root + '\\product.html');
    	res.sendfile(html);
    });

    app.get('/login', function(req, res){
        var html = path.normalize(config.root + '\\login.html');
        res.sendfile(html);
    });
};