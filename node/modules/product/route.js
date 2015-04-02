module.exports = function (app) {
    var product = require('./controller');
    var product = new product(app);
    app.post('/product/add', product.addProduct);
    app.post('/product/edit', product.editProduct);
    app.post('/product/getProductById', product.getProductById);
};