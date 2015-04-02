(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var tpl = require('./tpl/main');
var Model = require('./model');

window.home = {};
window.home.model = new Model();
window.home.model.subscribe(tpl.render);
tpl.render();
},{"./model":4,"./tpl/main":6}],2:[function(require,module,exports){
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

var home = function () {
	this.name = 'wudi3';
	this.onChanges = [];
	// this.data = [
	// 	{seq: 1, name: '阿斯顿框架和', num: 123, id: '1'},
	// 	{seq: 2, name: '2', num: 321, id: '2'},
	// 	{seq: 3, name: '3', num: 321, id: '3'},
	// 	{seq: 4, name: '4', num: 321, id: '4'},
	// 	{seq: 5, name: '5', num: 321, id: '5'},
	// 	{seq: 6, name: '6', num: 321, id: '6'},
	// 	{seq: 7, name: '7', num: 321, id: '7'}
	// ];
	this.data = [];
	this.getAllData();
};

home.prototype.subscribe = function (onChange) {
	this.onChanges.push(onChange);
};

home.prototype.inform = function () {
	this.onChanges.forEach(function (cb) { cb(); });
};

home.prototype.getAllData = function () {
	var that = this;
	$.ajax({
		type: 'get',
		url: '/home/getProducts',
		data: {},
		success: function (json) {
			if (json.code == 100000) {
				that.data = json.data;
				for(var i = 0; i < that.data.length; i++) {
					that.data[i]['seq'] = i + 1;
				}
				that.inform();
			} else {
				alert(json.msg);
			}
		},
		error: function () {
			alert('error');
		}
	});
};


module.exports = home;
},{}],5:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';
var OneItem = React.createClass({displayName: "OneItem",
	render: function(){
		return (
			React.createElement("tr", null, 
          		React.createElement("td", null, this.props.data.seq), 
          		React.createElement("td", null, this.props.data.name), 
          		React.createElement("td", null, this.props.data.total), 
          		React.createElement("td", null, this.props.data.left), 
          		React.createElement("td", null, this.props.data.price), 
          		React.createElement("td", null, this.props.data.sale), 
          		React.createElement("td", {className: "text-center"}, 
	          		React.createElement("a", {href: "javascript:;", onClick: this.props.edit.bind(this, this.props.data._id)}, React.createElement("span", {className: "glyphicon glyphicon-pencil", "aria-hidden": "true"})), 
	          		React.createElement("a", {href: "javascript:;", onClick: this.props.del.bind(this, this.props.data._id), className: "T_ML10"}, React.createElement("span", {className: "glyphicon glyphicon-remove", "aria-hidden": "true"}))
	          	)
        	)
		);
	}
});

var PageZone = React.createClass({displayName: "PageZone",
	nextPage: function (spec) {
		if (this.refs.next.getDOMNode().className.indexOf('disabled') > -1) return;
		this.props.nextPage();
	},
	prevPage: function () {
		if (this.refs.prev.getDOMNode().className.indexOf('disabled') > -1) return;
		this.props.prevPage();
	},
	render: function(){
		var prevCss = 'previous disabled';
		var nextCss = 'next disabled';

		if (this.props.page > 1) {
			prevCss = 'previous';
		}

		if (this.props.totalPage > this.props.page) {
			nextCss = 'next';
		}

		return (
			React.createElement("nav", null, 
			  	React.createElement("ul", {className: "pager"}, 
			    	React.createElement("li", {className: prevCss, ref: "prev"}, React.createElement("a", {href: "javascript:;", onClick: this.prevPage}, React.createElement("span", {"aria-hidden": "true"}, "←"), " 上一页")), 
			    	React.createElement("li", {className: nextCss, ref: "next"}, React.createElement("a", {href: "javascript:;", onClick: this.nextPage}, "下一页 ", React.createElement("span", {"aria-hidden": "true"}, "→")))
			  	)
			)
		);
	}
});

var SearchZone = React.createClass({displayName: "SearchZone",
	change: function () {
		var keyword = this.refs.keyword.getDOMNode().value;
		this.props.change(keyword);
	},
	render: function(){
		return(
			React.createElement("div", {className: "input-group"}, 
		      	React.createElement("input", {type: "text", ref: "keyword", className: "form-control", placeholder: "按名称查找", onChange: this.change})
		    )
		);
	}
});

var HomeTable = React.createClass({displayName: "HomeTable",
	getInitialState: function () {
        return {
            page: 1,
            num: 5,
            filter: ''
        };
    },
    nextPage: function () {
    	this.setState({page: this.state.page + 1});
    },
    prevPage: function () {
    	this.setState({page: this.state.page - 1});
    },
	getDataByState: function(){
		var start = (this.state.page - 1) * this.state.num + 1;
		var end = start + 4;
		var tempData = [];
		var filter_data = [];

		filter_data = this.props.data.filter(function(item){
			var filter = this.state.filter;
			if(item.name.indexOf(filter) > -1){
				return true;
			}else{
				return false;
			}
		}, this);

		for (var i = start - 1; i < end; i++) {
			if (filter_data[i]) {
				var temp = tempData.length;
				tempData[temp] = filter_data[i];
				tempData[temp].seq = i + 1;
			} else {
				break;
			}
		}
		

		return tempData;
	},
	doSearch: function(keyword){
		this.setState({page: 1, filter: keyword});
	},
	edit: function (id) {
		window.location.href = "/product?id=" + id;
	},
	del: function (id) {
		alert(id);
	},
  	render: function() {
  		var tempData = this.getDataByState();
  		var totalPage = Math.ceil(this.props.data.length / this.state.num);

  		var items = tempData.map(function(item){
  			return (
  				React.createElement(OneItem, {data: item, edit: this.edit, del: this.del})
  			);
  		}, this);

	    return (
	    	React.createElement("div", null, 
		    	React.createElement("div", {className: "row"}, 
			  		React.createElement("div", {className: "col-md-2 pull-right"}, 
			      		React.createElement(SearchZone, {change: this.doSearch})
			      	)
			    ), 
			    React.createElement("table", {className: "table table-bordered table-hover"}, 
		  			React.createElement("caption", null), 
			      	React.createElement("colgroup", {span: "7"}, 
			      		React.createElement("col", {className: "T_W10P"}), 
			      		React.createElement("col", null), 
			      		React.createElement("col", null), 
			      		React.createElement("col", null), 
			      		React.createElement("col", null), 
			      		React.createElement("col", null), 
			      		React.createElement("col", {className: "T_W10P"})
			      	), 
			      	React.createElement("thead", null, 
			        	React.createElement("tr", null, 
			          		React.createElement("th", null, "序号"), 
			          		React.createElement("th", null, "名称"), 
			          		React.createElement("th", null, "总量"), 
			          		React.createElement("th", null, "余量"), 
			          		React.createElement("th", null, "进价"), 
			          		React.createElement("th", null, "售价"), 
			          		React.createElement("th", {className: "text-center"}, "操作")
			        	)
			      	), 
			      	React.createElement("tbody", null, 
			      		items
			      	)
			    ), 
			    React.createElement(PageZone, {
			    	page: this.state.page, 
			    	totalPage: totalPage, 
			    	nextPage: this.nextPage, 
			    	prevPage: this.prevPage})
			)
	    );
  	}
});

module.exports = HomeTable;
},{}],6:[function(require,module,exports){
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
},{"../../common/tpl/header":2,"../../common/tpl/left":3,"./homeTable":5}]},{},[1]);
