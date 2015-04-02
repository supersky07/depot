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