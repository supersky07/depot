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