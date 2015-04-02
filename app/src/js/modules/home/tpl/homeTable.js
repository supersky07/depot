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