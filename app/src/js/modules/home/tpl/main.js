/** @jsx React.DOM */
'use strict';
var that = {};
var Header = require('../../common/tpl/header');
var Left = require('../../common/tpl/left');
var HomeTable = require('./homeTable');

var Home = React.createClass({displayName: "Home",
    render: function () {
        return (
        	React.createElement("div", null, 
				React.createElement(Header, {user: this.props.model.name}), 
				React.createElement("div", {className: "row"}, 
			  		React.createElement("div", {className: "col-md-2"}, 
						React.createElement(Left, {page: "home"})
			  		), 
			  		React.createElement("div", {className: "col-md-10"}, 
			  			React.createElement(HomeTable, {data: this.props.model.data})
			  		)
			  	)
			)
        );
    }
});

var render = function(){
    React.renderComponent(
        React.createElement(Home, {model: window.home.model}),
        document.getElementById('container')
    );
};
that.render = render;

module.exports = that;