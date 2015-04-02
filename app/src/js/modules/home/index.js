'use strict';

var tpl = require('./tpl/main');
var Model = require('./model');

window.home = {};
window.home.model = new Model();
window.home.model.subscribe(tpl.render);
tpl.render();