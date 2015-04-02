'use strict';

var tpl = require('./tpl/main');
var Model = require('./model');

window.login = {};
window.login.model = new Model();
window.login.model.subscribe(tpl.render);
tpl.render();