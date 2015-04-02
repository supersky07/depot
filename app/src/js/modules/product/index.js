'use strict';

var tpl = require('./tpl/main');
var Model = require('./model');

window.product = {};
window.product.model = new Model();
window.product.model.subscribe(tpl.render);
tpl.render();