(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var tpl = require('./tpl/main');
var Model = require('./model');

window.product = {};
window.product.model = new Model();
window.product.model.subscribe(tpl.render);
tpl.render();
},{"./model":4,"./tpl/main":5}],2:[function(require,module,exports){
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
/** @jsx React.DOM */
var Left = React.createClass({displayName: "Left",
	logOut: function () {
		alert('logout');
	},
  	render: function() {
  		var tempCss = {
  			home: '',
  			product: '',
  			set: ''
  		};
  		tempCss[this.props.page] = 'active';

    	return (
    		React.createElement("ul", {className: "nav nav-pills nav-stacked"}, 
	  			React.createElement("li", {role: "presentation", className: tempCss.home}, React.createElement("a", {href: "/home"}, "仓库总览")), 
	  			React.createElement("li", {role: "presentation", className: tempCss.product}, React.createElement("a", {href: "/product"}, "货物管理")), 
	  			React.createElement("li", {role: "presentation", className: tempCss.set}, React.createElement("a", {href: "javascript:;"}, "个人设置")), 
	  			React.createElement("li", {role: "presentation"}, React.createElement("a", {href: "javascript:;", onClick: this.logOut}, "退出"))
			)
    	);
  	}
});

module.exports = Left;
},{}],4:[function(require,module,exports){
'use strict';

var product = function () {
	this.name = 'wudi3';
	this.pageType = 'add';
	this.onChanges = [];
	this.data = {};
	this.getDataById();
};

product.prototype.subscribe = function (onChange) {
	this.onChanges.push(onChange);
};

product.prototype.inform = function () {
	this.onChanges.forEach(function (cb) { cb(); });
};

product.prototype.save = function (data) {
	var url = '/product/add';

	if (data['_id']) {
		url = '/product/edit';
	}

	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		success: function (json) {
			if (json.code == 100000) {
				alert('保存成功');
			} else {
				alert(json.msg);
			}
		},
		error: function () {
			alert('error');
		}
	});
};

product.prototype.getDataById = function () {
	var that = this;
	var _id = window.location.href.indexOf('id=') > -1 ? window.location.href.split('id=')[1] : '';
	if (_id != '') {
		this.pageType = 'edit';
		$.ajax({
			type: 'POST',
			url: '/product/getProductById',
			data: {id: _id},
			success: function (json) {
				if (json.code == 100000) {
					that.data = json.data;
					that.inform();
				} else {
					alert(json.msg);
				}
			},
			error: function () {
				alert('error');
			}
		});
	}
};


module.exports = product;
},{}],5:[function(require,module,exports){
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
},{"../../common/tpl/header":2,"../../common/tpl/left":3,"./productEdit":6}],6:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';
var Product = React.createClass({displayName: "Product",
    getInitialState: function() {
        return {
            name: this.props.data.name,
            total: this.props.data.total,
            left: this.props.data.left,
            price: this.props.data.price,
            sale: this.props.data.sale
        };
    },
    handleChange: function (type, evt) {
        var val = evt.target.value;
        var data = {};
        if (type != 'name') {
            val = val.replace(/[^\.\d]/g, '');
        }
        data[type] = val;
        this.props.data[type] = val;
        this.setState(data);
    },
    save: function (id) {
        var postData = {};
        postData['_id'] = id;

        for (var o in this.state) {
            postData[o] = this.refs[o].getDOMNode().value;
        }

        this.props.save(postData);
    },
    back: function () {
        window.location.href = '/home';  
    },
    render: function() {
        var buttonArea = (
            React.createElement("div", {className: "col-sm-offset-4 col-sm-4"}, 
                React.createElement("button", {className: "btn btn-primary btn-lg btn-block", onClick: this.save.bind(this, this.props.data._id)}, "保存")
            )
        );
            
        if (this.props.pageType == 'edit') {
            buttonArea = (
                React.createElement("div", null, 
                    React.createElement("div", {className: "col-sm-offset-4 col-sm-2"}, 
                        React.createElement("button", {className: "btn btn-primary btn-lg btn-block", onClick: this.save.bind(this, this.props.data._id)}, "保存")
                    ), 
                    React.createElement("div", {className: "col-sm-2"}, 
                        React.createElement("button", {className: "btn btn-primary btn-lg btn-block", onClick: this.back}, "返回")
                    )
                )
            );
        }
        return (
            React.createElement("div", {className: "form-horizontal", role: "form"}, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {for: "inputName", className: "col-sm-offset-2 col-sm-2 control-label"}, "名称"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("input", {type: "text", ref: "name", className: "form-control", id: "inputName", placeholder: "名称", value: this.props.data.name, onChange: this.handleChange.bind(this, 'name')})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {for: "inputTotal", className: "col-sm-offset-2 col-sm-2 control-label"}, "总量"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("input", {type: "text", ref: "total", className: "form-control", id: "inputTotal", placeholder: "总量", value: this.props.data.total, onChange: this.handleChange.bind(this, 'total')})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {for: "inputLeft", className: "col-sm-offset-2 col-sm-2 control-label"}, "余量"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("input", {type: "text", ref: "left", className: "form-control", id: "inputLeft", placeholder: "余量", value: this.props.data.left, onChange: this.handleChange.bind(this, 'left')})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {for: "inputPrice", className: "col-sm-offset-2 col-sm-2 control-label"}, "进价"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("input", {type: "text", ref: "price", className: "form-control", id: "inputPrice", placeholder: "进价", value: this.props.data.price, onChange: this.handleChange.bind(this, 'price')})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {for: "inputSale", className: "col-sm-offset-2 col-sm-2 control-label"}, "售价"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("input", {type: "text", ref: "sale", className: "form-control", id: "inputSale", placeholder: "售价", value: this.props.data.sale, onChange: this.handleChange.bind(this, 'sale')})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    buttonArea
                )
            )
        );
    }
});

module.exports = Product;
},{}]},{},[1]);
