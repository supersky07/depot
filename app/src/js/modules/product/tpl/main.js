/** @jsx React.DOM */
'use strict';
var that = {};
var Header = require('../../common/tpl/header');
var Left = require('../../common/tpl/left');
var Product = require('./productEdit');

var AddProduct = React.createClass({displayName: "AddProduct",
    render: function () {
        return (
        	React.createElement("div", null, 
				React.createElement(Header, {user: this.props.model.name}), 
				React.createElement("div", {className: "row"}, 
			  		React.createElement("div", {className: "col-md-2"}, 
						React.createElement(Left, {page: "product"})
			  		), 
			  		React.createElement("div", {className: "col-md-10"}, 
			  			React.createElement(Product, {data: this.props.model.data, pageType: this.props.model.pageType, save: this.props.model.save})
			  		)
			  	)
			)
        );
    }
});

var render = function(){
    React.renderComponent(
        React.createElement(AddProduct, {model: window.product.model}),
        document.getElementById('container')
    );
};
that.render = render;

module.exports = that;