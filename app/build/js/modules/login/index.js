(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var tpl = require('./tpl/main');
var Model = require('./model');

window.login = {};
window.login.model = new Model();
window.login.model.subscribe(tpl.render);
tpl.render();
},{"./model":3,"./tpl/main":4}],2:[function(require,module,exports){
/** @jsx React.DOM */
var Header = React.createClass({displayName: "Header",
  	render: function() {
  		var welcome = React.createElement("div", {className: "T_welcome"}, "欢迎您，", React.createElement("strong", null, this.props.user));
  		if(!this.props.user) {
  			welcome = '';
  		}
	    return (
	    	React.createElement("div", {className: "page-header T_pr"}, 
	      		React.createElement("h1", null, "仓库管理工具"), 
				welcome
			)
	    );
  	}
});

module.exports = Header;
},{}],3:[function(require,module,exports){
'use strict';

var Login = function () {
	this.onChanges = [];
};

Login.prototype.subscribe = function (onChange) {
	this.onChanges.push(onChange);
};

Login.prototype.inform = function () {
	this.onChanges.forEach(function (cb) { cb(); });
};

Login.prototype.doLogin = function (user, pswd) {
	var that = this;
    var pswd = this.do_encrypt(pswd);
	$.ajax({
        url: "/login/doLogin",
        data: {
            user: user,
            pswd: pswd
        },
        type: "GET",
        success: function (data) {
            var temp = eval( "(" + data + ")");
            if (temp.code == 0) {
                window.location.replace("templateMerge.html");
            } else {
                that.logErr = temp.msg || '登陆失败';
                that._inform();
            }
        }
    });
};

Login.prototype.saveUser = function (user, pswd) {
	var that = this;
    var pswd = this.do_encrypt(pswd);
	$.ajax({
        url: "/login/saveUser",
        data: {
            user: user,
            pswd: pswd
        },
        type: "GET",
        success: function (json) {
            if (json.code == 100000) {
                console.log('ok');
            } else {
                
            }
        }
    });
};

Login.prototype.checkLogin = function () {
    $.ajax({
        url: "/login/checkLogin",
        type: "GET",
        success: function (data) {
            var temp = eval( "(" + data + ")");
            if (temp.code == 0) {
                window.location.replace("templateMerge.html");
            }
        }
    });
};

Login.prototype.do_encrypt = function (value) {
    return $.md5(value);
};


module.exports = Login;
},{}],4:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';
var that = {};
var Header = require('../../common/tpl/header');

var Login = React.createClass({displayName: "Login",
    render: function () {
        return (
        	React.createElement("div", null, 
				React.createElement(Header, {user: ""}), 
				React.createElement("div", {className: "row T_Mt100"}, 
			  		React.createElement("div", {className: "col-md-10"}, 
			  			React.createElement("div", {className: "col-md-4"}
						), 
						React.createElement("div", {className: "col-md-5"}, 
							React.createElement("form", {className: "form-horizontal"}, 
							  React.createElement("div", {className: "form-group"}, 
							    React.createElement("label", {for: "inputEmail3", className: "col-sm-2 control-label"}, "账号"), 
							    React.createElement("div", {className: "col-sm-10"}, 
							      React.createElement("input", {type: "email", className: "form-control", id: "inputEmail3", placeholder: "请输入用户名"})
							    )
							  ), 
							  React.createElement("div", {className: "form-group"}, 
							    React.createElement("label", {for: "inputPassword3", className: "col-sm-2 control-label"}, "密码"), 
							    React.createElement("div", {className: "col-sm-10"}, 
							      React.createElement("input", {type: "password", className: "form-control", id: "inputPassword3", placeholder: "请输入密码"})
							    )
							  ), 
							  React.createElement("div", {className: "form-group"}, 
							    React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
							      React.createElement("div", {className: "checkbox"}, 
							        React.createElement("label", null, 
							          React.createElement("input", {type: "checkbox"}), " 记住我的密码"
							        )
							      )
							    )
							  ), 
							  React.createElement("div", {className: "form-group"}, 
							    React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
							      React.createElement("button", {type: "submit", className: "btn btn-default"}, "登录"), 
							      React.createElement("button", {type: "button", className: "btn btn-default T_ML10"}, "忘记密码")
							    )
							  )
							)
						)
			  		)
			  	)
			)
        );
    }
});

var render = function(){
    React.renderComponent(
        React.createElement(Login, {model: window.login.model}),
        document.getElementById('container')
    );
};
that.render = render;

module.exports = that;
},{"../../common/tpl/header":2}]},{},[1]);
