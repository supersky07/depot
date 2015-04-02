/** @jsx React.DOM */
var Left = React.createClass({
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
    		<ul className="nav nav-pills nav-stacked">
	  			<li role="presentation" className={tempCss.home}><a href="/home">仓库总览</a></li>
	  			<li role="presentation" className={tempCss.product}><a href="/product">货物管理</a></li>
	  			<li role="presentation" className={tempCss.set}><a href="javascript:;">个人设置</a></li>
	  			<li role="presentation"><a href="javascript:;" onClick={this.logOut}>退出</a></li>
			</ul>
    	);
  	}
});

module.exports = Left;