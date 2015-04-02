'use strict';

module.exports = function (app) {
    var Product = app.dbconn.depot.model('product');

    this.getProducts = function(req, res) {     
        Product.find().exec(function(err, products) {
            if (err) {
                res.json({
                    code : 100001,
                    msg : '错误',
                    data: ''
                });
            } else {
                res.json({
                    code : 100000,
                    msg : '成功',
                    data: products
                });
            }
        });
    };
};