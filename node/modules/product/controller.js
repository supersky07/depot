'use strict';

module.exports = function (app) {
    var Product = app.dbconn.depot.model('product');

    this.addProduct = function(req, res) {
        var reqData = {
            name: req.body.name,
            total: req.body.total || 0,
            left: req.body.left || 0,
            price: req.body.price || 0,
            sale: req.body.sale || 0
        };

        Product.create(reqData, function(error){
            if(error) {
                res.json({
                    code : 100001,
                    msg : error,
                    data: ''
                });
            } else {
                res.json({
                    code : 100000,
                    msg : '',
                    data: ''
                });
            }
        });
    };

    this.editProduct = function(req, res) {
        var reqData = {
            name: req.body.name,
            total: req.body.total || 0,
            left: req.body.left || 0,
            price: req.body.price || 0,
            sale: req.body.sale || 0
        };

        var condition = {
            _id: req.body._id
        };

        Product.update(condition, reqData, function(error){
            if(error) {
                res.json({
                    code: 100001,
                    msg: error,
                    data: ''
                });
            } else {
                res.json({
                    code: 100000,
                    msg: '',
                    data: ''
                });
            }
        });
    };

    this.getProductById = function(req, res) {
        var condition = {
            _id: req.body.id
        };

        Product.findOne(condition, function(error, product){
            if(error) {
                res.json({
                    code: 100001,
                    msg: error,
                    data: ''
                });
            } else {
                res.json({
                    code: 100000,
                    msg: '',
                    data: product
                });
            }
        });
    };
};