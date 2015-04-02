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