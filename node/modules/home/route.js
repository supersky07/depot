module.exports = function (app) {
    var home = require('./controller');
    var home = new home(app);
    app.get('/home/getProducts', home.getProducts);
};