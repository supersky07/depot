/** @jsx React.DOM */
var Header = React.createClass({
  	render: function() {
  		var welcome = <div className="T_welcome">欢迎您，<strong>{this.props.user}</strong></div>;
  		if(!this.props.user) {
  			welcome = '';
  		}
	    return (
	    	<div className="page-header T_pr">
	      		<h1>仓库管理工具</h1>
				{welcome}
			</div>
	    );
  	}
});

module.exports = Header;